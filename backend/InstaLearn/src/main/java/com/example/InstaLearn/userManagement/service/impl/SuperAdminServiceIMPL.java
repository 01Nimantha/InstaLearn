package com.example.InstaLearn.userManagement.service.impl;

import com.example.InstaLearn.userManagement.dto.SuperAdminSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.SuperAdminUpdateRequestDTO;
import com.example.InstaLearn.userManagement.dto.SuperAdminSaveRequestDTO;
import com.example.InstaLearn.userManagement.entity.SuperAdmin;
import com.example.InstaLearn.userManagement.entity.SuperAdmin;
import com.example.InstaLearn.userManagement.repo.SuperAdminRepo;
import com.example.InstaLearn.userManagement.service.SuperAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SuperAdminServiceIMPL implements SuperAdminService {
    @Autowired
    private SuperAdminRepo superAdminRepo;

    @Override
    public String saveSuperAdmin(SuperAdminSaveRequestDTO superAdminSaveRequestDTO) {
        SuperAdmin superAdmin = new SuperAdmin(
                superAdminSaveRequestDTO.getSadminId(),
                superAdminSaveRequestDTO.getSadminEmail()
        );

        superAdminRepo.save(superAdmin);

        return superAdminSaveRequestDTO.getSadminEmail();
    }

    @Override
    public String updateSuperAdmin(SuperAdminUpdateRequestDTO superAdminUpdateRequestDTO) {
        if(superAdminRepo.existsById(superAdminUpdateRequestDTO.getSadminId())) {
            SuperAdmin superAdmin = superAdminRepo.getReferenceById(superAdminUpdateRequestDTO.getSadminId());
            superAdmin.setSadminEmail(superAdminUpdateRequestDTO.getSadminEmail());

            superAdminRepo.save(superAdmin);
            return superAdminUpdateRequestDTO.getSadminEmail() + " Updated Successfully";
        }
        else{
            throw new RuntimeException("No data found for that id");
        }
    }

    @Override
    public String deleteSuperAdmin(String sadminId) {
        if (superAdminRepo.existsById(sadminId)) {
            superAdminRepo.deleteById(sadminId);
            return "Deleted Successfully "+sadminId;
        }
        else{
            throw new RuntimeException("No customer found for that id");
        }
    }

    @Override
    public SuperAdminSaveRequestDTO getSuperAdminById(int superAdminId) {
        if(superAdminRepo.existsById(superAdminId)) {
            SuperAdmin superAdmin = superAdminRepo.getReferenceById(superAdminId);
            SuperAdminSaveRequestDTO superAdminSaveRequestDTO = new SuperAdminSaveRequestDTO(
                    superAdmin.getSadminId(),
                    superAdmin.getSadminEmail()
            );


            return superAdminSaveRequestDTO;
        }
        else{
            throw new RuntimeException("No SuperAdmin");
        }
    }
}
