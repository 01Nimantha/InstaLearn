package com.example.InstaLearn.userManagement.entity;

import com.example.InstaLearn.userManagement.entity.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
