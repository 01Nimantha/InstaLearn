package com.example.InstaLearn.userManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "admin")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Admin {

    @Id
    @Column(name = "admin_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int adminId;

    @Column(name="admin_name")
    private String adminName;

    @Column(name="admin_email")
    private String adminEmail;

    @Column(name="admin_contactno")
    private String adminContactno;

    @Column(name="admin_address")
    private String adminAddress;

}
