package com.example.InstaLearn.attendanceManagement.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AttendanceDTO {
    private String studentId;
    private LocalDate createdAt;
    private boolean presentState;
    private long classTypeId;

}
