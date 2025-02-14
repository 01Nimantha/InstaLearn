
package com.example.InstaLearn.authentication;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    public String login(String username, String password) {
        try {
            System.out.println("Authenticating user: " + username);
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

            Optional<AuthenticationUser> user = userRepository.findByUsername(username);
            return user.map(u -> jwtUtil.generateToken(username, u.getRole().name())).orElse(null);
        } catch (Exception e) {
            System.out.println("Authentication failed: " + e.getMessage());
            return null;
        }
    }

}
