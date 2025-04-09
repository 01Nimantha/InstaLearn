package com.example.InstaLearn.attendanceManagement.service;

import com.example.InstaLearn.attendanceManagement.dto.*;
import com.example.InstaLearn.attendanceManagement.entity.Attendance;
import com.example.InstaLearn.attendanceManagement.repo.AttendanceRepo;
import com.example.InstaLearn.userManagement.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import java.time.LocalDate;
import java.util.Date;

public interface AttendanceService {

    String saveAttendance(AttendanceDTO attendanceDTO);

    long getTotalAttendance();

    List<GetAttendanceDTO> getAttendanceById(String studentId);

    List<StudentAttendanceDTO> getStudentsWithAttendance();

    List<ClassedBasedAttendanceDTO> getAttendanceByClassId(long classId);

    String saveAttendanceByClassId(long classId, AttendanceSaveRequestDTO attendanceDTO);

    String finalizeAttendanceByClassId(long classId);


    int getPresentCountByDate(LocalDate localDate);

    void cleanUpOldAttendance();

    void monthlyAttendanceCleanup();
}
