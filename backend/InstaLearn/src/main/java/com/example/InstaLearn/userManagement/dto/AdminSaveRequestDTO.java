package com.example.InstaLearn.userManagement.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AdminSaveRequestDTO {
    private int adminId;
    private String adminEmail;
    private String adminContactno;
    private String adminAddress;
}
