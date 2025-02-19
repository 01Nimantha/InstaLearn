package com.example.InstaLearn.userManagement.service.impl;

import com.example.InstaLearn.userManagement.dto.LoginRequest;
import com.example.InstaLearn.userManagement.entity.User;
import com.example.InstaLearn.userManagement.repo.UserRepo;
import com.example.InstaLearn.userManagement.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service

public class AuthServiceIMPL implements AuthService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public String authenticateUser(LoginRequest loginRequest) {
        Optional<User> userOpt = userRepo.findByUserName(loginRequest.getUserName());

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            if (loginRequest.getUserPassword().equals(user.getUserPassword())) {
                return user.getRole().name();
            }
        }
        return null; // Authentication failed
    }


}
