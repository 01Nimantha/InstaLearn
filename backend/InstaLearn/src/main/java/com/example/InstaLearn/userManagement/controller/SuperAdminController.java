package com.example.InstaLearn.userManagement.controller;

import com.example.InstaLearn.userManagement.dto.SuperAdminSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.SuperAdminUpdateRequestDTO;
import com.example.InstaLearn.userManagement.dto.TeacherSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.TeacherUpdateRequestDTO;
import com.example.InstaLearn.userManagement.service.SuperAdminService;
import com.example.InstaLearn.userManagement.service.TeacherService;
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
    public String deleteSuperAdmin(@RequestParam(value = "id") int sadminId) {
        String deleted=superAdminService.deleteSuperAdmin(sadminId);
        return deleted;
    }
}
