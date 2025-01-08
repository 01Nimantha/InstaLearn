package com.example.InstaLearn.userManagement.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "super_admin")
public class SuperAdmin {
    @Id
    @Column(name = "sadmin_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int sadminId;

    @Column(name = "sadmin_email")
    private int sadminEmail;

}
