package com.example.InstaLearn.userManagement.controller;

import com.example.InstaLearn.userManagement.dto.AdminSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.AdminUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Admin;
import com.example.InstaLearn.userManagement.entity.Parent;
import com.example.InstaLearn.userManagement.service.AdminService;
import com.example.InstaLearn.userManagement.service.StudentService;
import com.example.InstaLearn.userManagement.util.StandardResponse;
import com.google.zxing.WriterException;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/v1/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private StudentService studentService;

    @PostMapping("/save")
    public ResponseEntity<StandardResponse> saveAdmin(@RequestBody AdminSaveRequestDTO adminSaveRequestDTO){
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
    @GetMapping("/get-all-admins")
    public ResponseEntity<List<Admin>> getAllAdmins(){
        return new ResponseEntity<>(adminService.getAllAdmins(), HttpStatus.FOUND);
    }
    @GetMapping("/get-admin-by/{id}")
    public Admin getAdminById(@PathVariable(value="id") String adminId) {
        return adminService.getAdminById(adminId);

    }




}
