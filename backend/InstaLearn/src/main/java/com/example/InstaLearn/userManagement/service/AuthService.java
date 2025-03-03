package com.example.InstaLearn.userManagement.service;

import com.example.InstaLearn.userManagement.entity.User;
import com.example.InstaLearn.userManagement.entity.enums.Role;
import com.example.InstaLearn.userManagement.repo.UserRepo;
import com.example.InstaLearn.userManagement.util.JwtUtil;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class AuthService implements UserDetailsService {

    private final UserRepo userRepo;
    private final PasswordService passwordService;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepo userRepo, PasswordService passwordService, JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.passwordService = passwordService;
        this.jwtUtil = jwtUtil;

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Replace with your own logic to retrieve user from the database
        User user = userRepo.findByUserName(username);
        Role userRole=user.getRole();
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(userRole.toString()));

        return new org.springframework.security.core.userdetails.User(
                user.getUserName(),
                user.getUserPassword(),
                authorities
        );
    }

    public String authenticateUser(String username, String rawPassword) {
        User user = userRepo.findByUserName(username);
        String check=passwordService.hashPassword(rawPassword);
        boolean test=check.equals(user.getUserPassword());
        if (user != null && passwordService.verifyPassword(rawPassword, user.getUserPassword())) {
            return jwtUtil.generateToken(username); // Return JWT token
        }
        return null; // Authentication failed
    }
}

