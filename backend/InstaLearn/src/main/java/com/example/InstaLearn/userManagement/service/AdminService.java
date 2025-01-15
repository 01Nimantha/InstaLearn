package com.example.InstaLearn.userManagement.service;

import com.example.InstaLearn.userManagement.dto.AdminSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.AdminUpdateRequestDTO;

public interface AdminService {

    String saveAdmin(AdminSaveRequestDTO adminSaveRequestDTO);

    String updateAdmin(AdminUpdateRequestDTO adminUpdateRequestDTO);
}
