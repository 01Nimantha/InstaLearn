package com.example.InstaLearn.userManagement.service;

import com.example.InstaLearn.userManagement.dto.SuperAdminSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.SuperAdminUpdateRequestDTO;

public interface SuperAdminService {
    String saveSuperAdmin(SuperAdminSaveRequestDTO superAdminSaveRequestDTO);

    String updateSuperAdmin(SuperAdminUpdateRequestDTO superAdminUpdateRequestDTO);

    String deleteSuperAdmin(int sadminId);

    SuperAdminSaveRequestDTO getSuperAdminById(int superAdminId);
}
