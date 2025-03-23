package com.example.InstaLearn.attendanceManagement.service.impl;

import com.example.InstaLearn.attendanceManagement.dto.*;
import com.example.InstaLearn.attendanceManagement.entity.Attendance;
import com.example.InstaLearn.attendanceManagement.repo.AttendanceRepo;
import com.example.InstaLearn.attendanceManagement.service.AttendanceService;
import com.example.InstaLearn.classTypeManagement.entity.ClassType;
import com.example.InstaLearn.classTypeManagement.repo.ClassTypeRepo;
import com.example.InstaLearn.userManagement.entity.Student;
import com.example.InstaLearn.userManagement.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class AttendanceServiceIMPL implements AttendanceService {

    @Autowired
    private AttendanceRepo attendanceRepo;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private ClassTypeRepo classTypeRepo;

    @Override
    public String saveAttendance(AttendanceDTO attendanceDTO) {

        Student student = studentRepo.findById(attendanceDTO.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Attendance attendance = new Attendance();

        attendance.setStudent(student);
        attendance.setCreatedAt(LocalDate.now());
        attendance.setTimeRecorded(LocalTime.now());
        attendance.setPresentState(attendanceDTO.isPresentState());
        ClassType classType = classTypeRepo.findById(attendanceDTO.getClassTypeId())
                .orElseThrow(() -> new RuntimeException("Class type not found"));
        attendance.setClassType(classType);

        attendanceRepo.save(attendance);

        return "attendance has been saved";

    }

    @Override
    public long getTotalAttendance() {
        return attendanceRepo.count();
    }

    @Override
    public List<GetAttendanceDTO> getAttendanceById(String studentId) {
        List<Attendance> attendanceList = attendanceRepo.findByStudent_StudentId(studentId);

        if (attendanceList.size()>0) {
            List<GetAttendanceDTO> getAttendanceDTOList = new ArrayList<>();

            for (Attendance attendance : attendanceList) {
                GetAttendanceDTO getAttendanceDTO = new GetAttendanceDTO(
                        attendance.getCreatedAt(),
                        attendance.isPresentState(),
                        attendance.getClassType().getClassTypeId()
                );
                getAttendanceDTOList.add(getAttendanceDTO);
            }
            return getAttendanceDTOList;
        }else {
            throw new RuntimeException("No Student found");
        }
    }

    @Override
    public List<StudentAttendanceDTO> getStudentsWithAttendance() {

        List<Attendance> attendanceList = attendanceRepo.findAllAttendance();

        Map<String, List<GetAttendanceDTO>> groupedByStudent = attendanceList.stream()
                .collect(Collectors.groupingBy(
                        a -> a.getStudent().getStudentId(),
                        Collectors.mapping(a -> new GetAttendanceDTO(
                                a.getCreatedAt(),
                                a.isPresentState(),
                                a.getClassType().getClassTypeId()
                        ), Collectors.toList())
                ));

        // Convert the grouped map into a list of StudentAttendanceDTO
        return groupedByStudent.entrySet().stream()
                .map(entry -> new StudentAttendanceDTO(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    @Override
    public List<ClassedBasedAttendanceDTO> getAttendanceByClassId(long classId) {
        List<Attendance> attendanceList = attendanceRepo.findByClassType_ClassTypeId(classId);

        // Grouping attendance records by studentId
        Map<String, List<AttendanceListDTO>> groupedByStudent = attendanceList.stream()
                .collect(Collectors.groupingBy(
                        a -> a.getStudent().getStudentId(),
                        Collectors.mapping(a -> new AttendanceListDTO(
                                a.getCreatedAt(),
                                a.isPresentState()
                        ), Collectors.toList())
                ));

        // Convert to List of ClassedBasedAttendanceDTO
        return groupedByStudent.entrySet().stream()
                .map(entry -> new ClassedBasedAttendanceDTO(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    @Override
    public String saveAttendanceByClassId(long classId, AttendanceSaveRequestDTO attendanceDTO) {

        Student student = studentRepo.findById(attendanceDTO.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        ClassType classType = classTypeRepo.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class type not found with ID: " + classId));
        if (!student.getClassTypes().contains(classType)) {
            throw new RuntimeException("Student " + student.getStudentId() + " is not enrolled in class ID: " + classId);
        }

        Attendance attendance = new Attendance();

        attendance.setStudent(student);
        attendance.setCreatedAt(LocalDate.now());
        attendance.setTimeRecorded(LocalTime.now());
        attendance.setPresentState(true);
        attendance.setClassType(classTypeRepo.findById(classId).orElseThrow(() -> new RuntimeException("Class type not found")));

        attendanceRepo.save(attendance);

        return "attendance has been saved";
    }

    @Override
    public String finalizeAttendanceByClassId(long classId) {
        // Get the class type
        ClassType classType = classTypeRepo.findById(classId)
                .orElseThrow(() -> new RuntimeException("Class type not found"));

        // Fetch all students enrolled in this class
        List<Student> enrolledStudents = studentRepo.findStudentsByClassId(classId);

        // Get the current date for filtering attendance
        LocalDate today = LocalDate.now();

        // Fetch all students already marked present for this class today
        List<Attendance> attendanceList = attendanceRepo.findByClassTypeAndCreatedAt(classType, today);
        List<String> presentStudentIds = attendanceList.stream()
                .filter(Attendance::isPresentState)
                .map(attendance -> attendance.getStudent().getStudentId()) // Use String type for studentId
                .collect(Collectors.toList());

        // Mark absent students who are enrolled but not marked present
        for (Student student : enrolledStudents) {
            if (!presentStudentIds.contains(student.getStudentId())) {
                Attendance attendance = new Attendance();
                attendance.setStudent(student);
                attendance.setCreatedAt(today);
                attendance.setTimeRecorded(LocalTime.now());
                attendance.setPresentState(false);
                attendance.setClassType(classType);
                attendanceRepo.save(attendance);
            }
        }

        return "Attendance finalized for class ID: " + classId;
    }



    @Override
    public int getPresentCountByDate(LocalDate localDate) {
        return attendanceRepo.countByCreatedAtAndPresentState(localDate, true);
    }

}
