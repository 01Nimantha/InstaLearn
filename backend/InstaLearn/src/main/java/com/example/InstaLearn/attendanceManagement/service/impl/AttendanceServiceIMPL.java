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
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

        Attendance attendance = new Attendance();

        attendance.setStudent(student);
        attendance.setCreatedAt(LocalDate.now());
        attendance.setTimeRecorded(LocalTime.now());
        attendance.setPresentState(attendanceDTO.isPresentState());
        attendance.setClassType(classTypeRepo.findById(classId).orElseThrow(() -> new RuntimeException("Class type not found")));

        attendanceRepo.save(attendance);

        return "attendance has been saved";
    }



}
