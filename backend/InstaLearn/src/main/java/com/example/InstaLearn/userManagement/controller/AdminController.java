package com.example.InstaLearn.userManagement.controller;

import com.example.InstaLearn.userManagement.dto.AdminSaveRequestDTO;
import com.example.InstaLearn.userManagement.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/save")

    public String saveAdmin(@RequestBody AdminSaveRequestDTO adminSaveRequestDTO) {
        adminService.saveAdmin(adminSaveRequestDTO);
        return "saved";
    }




}
