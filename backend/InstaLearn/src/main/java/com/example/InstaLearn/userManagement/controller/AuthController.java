package com.example.InstaLearn.userManagement.controller;

import com.example.InstaLearn.userManagement.dto.LoginRequest;
import com.example.InstaLearn.userManagement.entity.User;
import com.example.InstaLearn.userManagement.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:5173/")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String role = authService.authenticateUser(loginRequest);

        if (role != null) {
            System.out.println(role);
            return ResponseEntity.ok().body( role);
        } else {
            return ResponseEntity.status(401).body("{\"error\": \"Invalid username or password\"}");
        }
    }
}