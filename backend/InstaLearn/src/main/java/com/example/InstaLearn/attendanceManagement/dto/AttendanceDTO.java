package com.example.InstaLearn.attendanceManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AttendanceDTO {
    private String classType;
    private Date date;
    private boolean presentState;
    private String studentId;
}
