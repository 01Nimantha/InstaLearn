package com.example.InstaLearn.attendanceManagement.service.impl;

import com.example.InstaLearn.attendanceManagement.dto.AttendanceDTO;
import com.example.InstaLearn.attendanceManagement.entity.Attendance;
import com.example.InstaLearn.attendanceManagement.repo.AttendanceRepo;
import com.example.InstaLearn.attendanceManagement.service.AttendanceService;
import com.example.InstaLearn.userManagement.entity.Student;
import com.example.InstaLearn.userManagement.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttendanceServiceIMPL implements AttendanceService {

    @Autowired
    private AttendanceRepo attendanceRepo;

    @Autowired
    private StudentRepo studentRepo;

    @Override
    public String saveAttendance(AttendanceDTO attendanceDTO) {

        Student student = studentRepo.findById(attendanceDTO.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Attendance attendance = new Attendance();

        attendance.setDate(attendanceDTO.getDate());
        attendance.setStudent(student);
        attendance.setClassType(attendanceDTO.getClassType());
        attendance.setPresentState(attendanceDTO.isPresentState());

        attendanceRepo.save(attendance);

        return "attendance has been saved";

    }

    @Override
    public long getTotalAttendance() {
        return attendanceRepo.count();
    }
}
