package com.example.InstaLearn.attendanceManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetAttendanceDTO {
    private LocalDate createdAt;
    private boolean presentState;
    private long classTypeId;
}
