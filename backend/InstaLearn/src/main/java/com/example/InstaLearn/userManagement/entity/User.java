package com.example.InstaLearn.userManagement.entity;

import com.example.InstaLearn.userManagement.entity.enums.Role;
import com.example.InstaLearn.userManagement.entity.idgenerator.AdminIdSequenceGenerator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.SecureRandom;

@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userId;

    @Column(name="user_name")
    private String userName;

    @Enumerated
    @Column(name="role" , nullable = false)
    private Role role;

    @Column(name="user_password" , nullable = false)
    private String userPassword;

//    @PrePersist
//    private void generateId() {
//        if (this.userPassword == null) {
//            this.userPassword = generatePassword();
//        }
//    }
    public String generatePassword() {

            String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
            SecureRandom random = new SecureRandom();
            StringBuilder password = new StringBuilder();

            for (int i = 0; i < 8; i++) {
                int index = random.nextInt(chars.length());
                password.append(chars.charAt(index));
            }
            return password.toString();
    }

}
