package com.example.InstaLearn.userManagement.service.impl;

import com.example.InstaLearn.userManagement.dto.AdminSaveRequestDTO;
import com.example.InstaLearn.userManagement.entity.Admin;
import com.example.InstaLearn.userManagement.repo.AdminRepo;
import com.example.InstaLearn.userManagement.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceIMPL implements AdminService {

    @Autowired
    private AdminRepo adminRepo;

    @Override
    public String saveAdmin(AdminSaveRequestDTO adminSaveRequestDTO) {
        Admin admin = new Admin(
                1,
                adminSaveRequestDTO.getAdminName(),
                adminSaveRequestDTO.getAdminEmail(),
                adminSaveRequestDTO.getAdminContactno(),
                adminSaveRequestDTO.getAdminAddress()
        );
        adminRepo.save(admin);
        return admin.getAdminName();
    }

}
