package com.example.InstaLearn.userManagement.controller;

import com.example.InstaLearn.userManagement.dto.SuperAdminSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.SuperAdminUpdateRequestDTO;
import com.example.InstaLearn.userManagement.dto.SuperAdminSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.SuperAdminUpdateRequestDTO;
import com.example.InstaLearn.userManagement.service.SuperAdminService;
import com.example.InstaLearn.userManagement.service.SuperAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/sadmin")
@CrossOrigin

public class SuperAdminController {
    @Autowired
    private SuperAdminService superAdminService;

    @PostMapping("/save")
    public String saveSuperAdmin(@RequestBody SuperAdminSaveRequestDTO superAdminSaveRequestDTO) {
        superAdminService.saveSuperAdmin(superAdminSaveRequestDTO);
        return "saved";

    }

    @PutMapping("/update")
    public String updateSuperAdmin(@RequestBody SuperAdminUpdateRequestDTO superAdminUpdateRequestDTO) {
        String  msg=superAdminService.updateSuperAdmin(superAdminUpdateRequestDTO);
        return msg;
    }

    @DeleteMapping(
            path = "delete-sadmin",
            params = "id"
    )
    public String deleteSuperAdmin(@RequestParam(value = "id") String sadminId) {
        String deleted=superAdminService.deleteSuperAdmin(sadminId);
        return deleted;
    }

    @GetMapping(
            path="/get-by-id",
            params = "id"

    )
    public SuperAdminSaveRequestDTO getSuperAdminById(@RequestParam(value = "id") int superAdminId) {
        SuperAdminSaveRequestDTO superAdminSaveRequestDTO=superAdminService.getSuperAdminById(superAdminId);
        return superAdminSaveRequestDTO ;
    }
}
