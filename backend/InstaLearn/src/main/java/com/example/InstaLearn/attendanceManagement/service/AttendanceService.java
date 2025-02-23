package com.example.InstaLearn.attendanceManagement.service;

import com.example.InstaLearn.attendanceManagement.dto.AttendanceDTO;
import com.example.InstaLearn.userManagement.entity.Student;

import java.time.LocalDate;
import java.util.Date;

public interface AttendanceService {
    String saveAttendance(AttendanceDTO attendanceDTO);

    long getTotalAttendance();

    int getPresentCountByDate(LocalDate date);
}
