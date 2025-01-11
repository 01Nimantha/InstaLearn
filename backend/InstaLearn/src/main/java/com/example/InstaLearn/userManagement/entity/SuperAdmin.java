package com.example.InstaLearn.userManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "super_admin")
@AllArgsConstructor
@NoArgsConstructor
@Data

public class SuperAdmin {
    @Id
    @Column(name = "sadmin_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int sadminId;

    @Column(name = "sadmin_email")
    private String sadminEmail;

}
