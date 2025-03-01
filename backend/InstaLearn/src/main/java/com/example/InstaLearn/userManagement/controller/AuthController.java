package com.example.InstaLearn.userManagement.controller;

import com.example.InstaLearn.userManagement.dto.LoginRequest;
import com.example.InstaLearn.userManagement.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        String token = authService.authenticateUser(loginRequest.getUserName(), loginRequest.getUserPassword());
        return token != null ? token : "Invalid credentials";
    }
}


