package com.example.InstaLearn.userManagement.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class SuperAdminSaveRequestDTO {
    private String sadminId;
    private String sadminEmail;
}
