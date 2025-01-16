package com.example.InstaLearn.userManagement.controller;

import com.example.InstaLearn.userManagement.dto.AdminSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.AdminUpdateRequestDTO;
import com.example.InstaLearn.userManagement.service.AdminService;
import com.example.InstaLearn.userManagement.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/save")
    public ResponseEntity<StandardResponse> saveAdmin(@RequestBody AdminSaveRequestDTO adminSaveRequestDTO) {
        String message = adminService.saveAdmin(adminSaveRequestDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"success",message),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<StandardResponse> updateAdmin(@PathVariable(value="id") String adminId,@RequestBody AdminUpdateRequestDTO adminUpdateRequestDTO) {
        String message = adminService.updateAdmin(adminId,adminUpdateRequestDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"success",message),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<StandardResponse> deleteAdmin(@PathVariable(value="id") String adminId) {
        String message = adminService.deleteAdmin(adminId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"success",message),
                HttpStatus.OK
        );
    }






}
