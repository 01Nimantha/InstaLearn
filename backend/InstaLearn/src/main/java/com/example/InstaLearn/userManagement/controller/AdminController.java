package com.example.InstaLearn.userManagement.controller;

import com.example.InstaLearn.userManagement.dto.AdminSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.AdminUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Admin;
import com.example.InstaLearn.userManagement.entity.AttendanceOfficer;
import com.example.InstaLearn.userManagement.service.AdminService;
import com.example.InstaLearn.userManagement.service.StudentService;
import com.example.InstaLearn.userManagement.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;
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
    public ResponseEntity<Page<Admin>> getAllAdmins(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ){
        Pageable pageable = PageRequest.of(page, size);

        Page<Admin> admins = adminService.getAllAdmins(pageable);
        return new ResponseEntity<>(admins,HttpStatus.OK);
    }
    @GetMapping("/get-admin-by/{id}")
    public Admin getAdminById(@PathVariable(value="id") String adminId) {
        return adminService.getAdminById(adminId);

    }




}
