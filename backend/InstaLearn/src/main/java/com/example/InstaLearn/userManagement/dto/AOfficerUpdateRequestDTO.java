package com.example.InstaLearn.userManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AOfficerUpdateRequestDTO {
    private String attendanceOfficerName;
    private String attendanceOfficerEmail;
    private String attendanceOfficerContactno;
    private String attendanceOfficerAddress;
}
