package com.example.InstaLearn.userManagement.service.impl;

import com.example.InstaLearn.userManagement.dto.AdminSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.AdminUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Admin;
import com.example.InstaLearn.userManagement.repo.AdminRepo;
import com.example.InstaLearn.userManagement.service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceIMPL implements AdminService {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String saveAdmin(AdminSaveRequestDTO adminSaveRequestDTO) {
          Admin admin = modelMapper.map(adminSaveRequestDTO, Admin.class);
          adminRepo.save(admin);
          return admin.getAdminName() + " Saved successfully";
    }

    @Override
    public String updateAdmin(AdminUpdateRequestDTO adminUpdateRequestDTO) {

        if (adminRepo.existsById(adminUpdateRequestDTO.getAdminId())) {

            Admin admin = adminRepo.getReferenceById(adminUpdateRequestDTO.getAdminId());
            modelMapper.map(adminUpdateRequestDTO, admin);
            adminRepo.save(admin);

            return admin.getAdminName() + " updated successfully";
        } else {
            throw new RuntimeException("Admin not found");
        }
    }

}
