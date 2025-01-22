package com.example.InstaLearn.userManagement.service.impl;

import com.example.InstaLearn.userManagement.dto.SuperAdminSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.SuperAdminUpdateRequestDTO;
import com.example.InstaLearn.userManagement.dto.SuperAdminSaveRequestDTO;
import com.example.InstaLearn.userManagement.entity.AttendanceOfficer;
import com.example.InstaLearn.userManagement.entity.SuperAdmin;
import com.example.InstaLearn.userManagement.entity.SuperAdmin;
import com.example.InstaLearn.userManagement.entity.User;
import com.example.InstaLearn.userManagement.entity.enums.Role;
import com.example.InstaLearn.userManagement.repo.SuperAdminRepo;
import com.example.InstaLearn.userManagement.repo.UserRepo;
import com.example.InstaLearn.userManagement.service.SuperAdminService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SuperAdminServiceIMPL implements SuperAdminService {
    @Autowired
    private SuperAdminRepo superAdminRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String saveSuperAdmin(SuperAdminSaveRequestDTO superAdminSaveRequestDTO) {
        SuperAdmin superAdmin = modelMapper.map(superAdminSaveRequestDTO,SuperAdmin.class);
        superAdminRepo.save(superAdmin);

        User user = new User();
        user.setUserName(String.valueOf(superAdmin.getSadminId()));// Set superAdmin as userName
        user.setRole(Role.valueOf("SUPERADMIN"));
        userRepo.save(user);

        // Associate the saved User with the superAdmin entity
        superAdmin.setUser(user);
        superAdminRepo.save(superAdmin);// Update superAdmin with the associated User

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
    public SuperAdminSaveRequestDTO getSuperAdminById(String superAdminId) {
        if(superAdminRepo.existsById(superAdminId)) {
            SuperAdmin superAdmin = superAdminRepo.getReferenceById(superAdminId);
            SuperAdminSaveRequestDTO superAdminSaveRequestDTO = new SuperAdminSaveRequestDTO(
                    superAdmin.getSadminEmail()
            );
            return superAdminSaveRequestDTO;
        }
        else{
            throw new RuntimeException("No SuperAdmin");
        }
    }
}
