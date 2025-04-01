package com.example.InstaLearn.userManagement.controller;

import com.example.InstaLearn.userManagement.dto.LoginRequest;
import com.example.InstaLearn.userManagement.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        if (loginRequest.getUserPassword() == null || loginRequest.getUserPassword().isEmpty()) {
            return "Password is required";
        }
        String token = authService.authenticateUser(loginRequest.getUserName(), loginRequest.getUserPassword());
        return token != null ? token : "Invalid credentials";
    }
}


