package com.example.InstaLearn.userManagement.service;

import com.example.InstaLearn.userManagement.dto.LoginRequest;
import com.example.InstaLearn.userManagement.entity.User;

public interface AuthService {
    public String authenticateUser(LoginRequest loginRequest);
}
