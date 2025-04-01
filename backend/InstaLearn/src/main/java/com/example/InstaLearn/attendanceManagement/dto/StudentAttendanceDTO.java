package com.example.InstaLearn.attendanceManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentAttendanceDTO {
    private String studentId;
    private List<GetAttendanceDTO> attendanceList;
}
