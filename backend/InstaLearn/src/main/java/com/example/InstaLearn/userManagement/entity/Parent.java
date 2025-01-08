package com.example.InstaLearn.userManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="parent")
@AllArgsConstructor
@NoArgsConstructor
@Data

public class Parent {
    @Id
    @Column(name = "parent_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int parentId;

    @Column(name = "parent_name")
    private String parentName;

    @Column(name = "parent_email")
    private String parentEmail;

    @Column(name = "parent_contactno")
    private String parentContactno;

    @Column(name = "parent_address")
    private String parentAddress;

    @Column(name = "parent_student_name")
    private String parentStName;


}
