package com.example.InstaLearn.userManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AdminUpdateRequestDTO {
    private String adminId;
    private String adminName;
    private String adminEmail;
    private String adminContactno;
    private String adminAddress;
}
