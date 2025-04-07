package com.example.InstaLearn.attendanceManagement.service.impl;

import com.example.InstaLearn.attendanceManagement.dto.*;
import com.example.InstaLearn.attendanceManagement.entity.Attendance;
import com.example.InstaLearn.attendanceManagement.repo.AttendanceRepo;
import com.example.InstaLearn.attendanceManagement.service.AttendanceService;
import com.example.InstaLearn.classTypeManagement.entity.ClassType;
import com.example.InstaLearn.classTypeManagement.repo.ClassTypeRepo;
import com.example.InstaLearn.userManagement.entity.Student;
import com.example.InstaLearn.userManagement.repo.StudentRepo;
import com.example.InstaLearn.attendanceManagement.exception.AttendanceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
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
                .orElseThrow(() -> new AttendanceException("Student not found", 404));

        ClassType classType = classTypeRepo.findById(attendanceDTO.getClassTypeId())
                .orElseThrow(() -> new AttendanceException("Class type not found", 404));

        // Check for existing attendance on the same day and hour
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        List<Attendance> existingAttendance = attendanceRepo.findByStudentAndDateAndHour(
                student.getStudentId(), today, now);

        if (!existingAttendance.isEmpty()) {
            throw new AttendanceException("Attendance for student " + student.getStudentId() +
                    " has already been recorded for today at this hour.", 409);
        }

        Attendance attendance = new Attendance();
        attendance.setStudent(student);
        attendance.setCreatedAt(LocalDate.now());
        attendance.setTimeRecorded(LocalTime.now());
        attendance.setPresentState(attendanceDTO.isPresentState());
        attendance.setClassType(classType);

        attendanceRepo.save(attendance);

        return "Attendance has been saved successfully";
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
        } else {
            throw new AttendanceException("No attendance records found for student", 404);
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

        return groupedByStudent.entrySet().stream()
                .map(entry -> new StudentAttendanceDTO(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    @Override
    public List<ClassedBasedAttendanceDTO> getAttendanceByClassId(long classId) {
        List<Attendance> attendanceList = attendanceRepo.findByClassType_ClassTypeId(classId);

        Map<String, List<AttendanceListDTO>> groupedByStudent = attendanceList.stream()
                .collect(Collectors.groupingBy(
                        a -> a.getStudent().getStudentId(),
                        Collectors.mapping(a -> new AttendanceListDTO(
                                a.getCreatedAt(),
                                a.isPresentState()
                        ), Collectors.toList())
                ));

        return groupedByStudent.entrySet().stream()
                .map(entry -> new ClassedBasedAttendanceDTO(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    @Override
    public String saveAttendanceByClassId(long classId, AttendanceSaveRequestDTO attendanceDTO) {
        Student student = studentRepo.findById(attendanceDTO.getStudentId())
                .orElseThrow(() -> new AttendanceException("Student not found", 404));

        ClassType classType = classTypeRepo.findById(classId)
                .orElseThrow(() -> new AttendanceException("Class type not found with ID: " + classId, 404));

        if (!student.getClassTypes().contains(classType)) {
            throw new AttendanceException("Student " + student.getStudentId() + " is not enrolled in class ID: " + classId, 400);
        }

        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        List<Attendance> existingAttendance = attendanceRepo.findByStudentAndDateAndHour(
                student.getStudentId(), today, now);

        if (!existingAttendance.isEmpty()) {
            throw new AttendanceException("Attendance for student " + student.getStudentId() +
                    " has already been recorded for today at this hour.", 409);
        }

        Attendance attendance = new Attendance();
        attendance.setStudent(student);
        attendance.setCreatedAt(LocalDate.now());
        attendance.setTimeRecorded(LocalTime.now());
        attendance.setPresentState(true);
        attendance.setClassType(classType);

        attendanceRepo.save(attendance);

        return "Attendance has been saved successfully";
    }

    @Override
    public String finalizeAttendanceByClassId(long classId) {
        ClassType classType = classTypeRepo.findById(classId)
                .orElseThrow(() -> new AttendanceException("Class type not found", 404));

        List<Student> enrolledStudents = studentRepo.findStudentsByClassId(classId);
        LocalDate today = LocalDate.now();

        List<Attendance> attendanceList = attendanceRepo.findByClassTypeAndCreatedAt(classType, today);
        List<String> presentStudentIds = attendanceList.stream()
                .filter(Attendance::isPresentState)
                .map(attendance -> attendance.getStudent().getStudentId())
                .collect(Collectors.toList());

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

        return "Attendance has been finalized successfully";
    }

    @Override
    public int getPresentCountByDate(LocalDate localDate) {
        return attendanceRepo.countByCreatedAtAndPresentState(localDate, true);
    }

    @Override
    public void cleanUpOldAttendance() {
        attendanceRepo.deleteNonCurrentMonthRecords();
    }

    @Scheduled(cron = "0 0 0 1 * *")  // Runs at midnight on the 1st of every month
    public void monthlyAttendanceCleanup() {
        cleanUpOldAttendance();
        System.out.println("Monthly attendance cleanup completed at " + LocalDateTime.now());
    }
}
