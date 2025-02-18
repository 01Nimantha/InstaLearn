package com.example.InstaLearn.userManagement.service;

import com.example.InstaLearn.userManagement.dto.AdminSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.AdminUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Admin;

import java.util.List;
import java.util.Optional;

public interface AdminService {

    String saveAdmin(AdminSaveRequestDTO adminSaveRequestDTO);

    String updateAdmin(String adminId,AdminUpdateRequestDTO adminUpdateRequestDTO);

    String deleteAdmin(String adminId);


    List<Admin> getAllAdmins();

    Admin getAdminById(String adminId);
}
