package com.example.InstaLearn.attendanceManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ClassedBasedAttendanceDTO {
    private String studentId;
    List<AttendanceListDTO> attendanceList;
}
