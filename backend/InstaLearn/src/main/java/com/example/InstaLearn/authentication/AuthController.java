package com.example.InstaLearn.authentication;
import com.example.InstaLearn.authentication.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:5173/")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthenticationUser loginRequest) {
        Optional<AuthenticationUser> userOptional = userRepository.findByUsername(loginRequest.getUsername());

        if (userOptional.isPresent()) {
            AuthenticationUser user = userOptional.get();

            if (user.getPassword().equals(loginRequest.getPassword())) {
                return ResponseEntity.ok(user.getRole());
            }
        }
        return ResponseEntity.status(401).body("Invalid username or password");
    }
}
