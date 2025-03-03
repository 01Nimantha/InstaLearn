package com.example.InstaLearn.attendanceManagement.service;

import com.example.InstaLearn.attendanceManagement.dto.*;
import com.example.InstaLearn.attendanceManagement.entity.Attendance;
import com.example.InstaLearn.userManagement.entity.Student;

import java.util.List;

public interface AttendanceService {
    String saveAttendance(AttendanceDTO attendanceDTO);

    long getTotalAttendance();

    List<GetAttendanceDTO> getAttendanceById(String studentId);

    List<StudentAttendanceDTO> getStudentsWithAttendance();

    List<ClassedBasedAttendanceDTO> getAttendanceByClassId(long classId);

    String saveAttendanceByClassId(long classId, AttendanceSaveRequestDTO attendanceDTO);
}
