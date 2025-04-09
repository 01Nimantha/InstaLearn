package com.example.InstaLearn.userManagement.service;

import com.example.InstaLearn.userManagement.dto.AdminSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.AdminUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Admin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface AdminService {

    String saveAdmin(AdminSaveRequestDTO adminSaveRequestDTO);

    String updateAdmin(String adminId,AdminUpdateRequestDTO adminUpdateRequestDTO);

    String deleteAdmin(String adminId);


    Page<Admin> getAllAdmins(Pageable pageable);

    Admin getAdminById(String adminId);

    Page<Admin> searchAdmins(String searchTerm, Pageable pageable);
}
