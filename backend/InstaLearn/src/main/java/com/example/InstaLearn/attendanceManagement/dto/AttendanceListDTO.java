package com.example.InstaLearn.attendanceManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AttendanceListDTO {
    private LocalDate createdAt;
    private boolean presentState;
}
