package com.example.InstaLearn.userManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name= "student")
@NoArgsConstructor
@AllArgsConstructor
@Data

public class Student {
    @Id
    @Column(name="student_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int studentId;

    @Column(name="student_name")
    private String studentName;

    @Column(name="student_email")
    private String studentEmail;

    @Column(name="student_contactno")
    private String studentContactno;

    @Column(name="student_address")
    private String studentAddress;

    @Column(name="student_parent_name")
    private String studentParentName;

    @Column(name="student_parent_email")
    private String studentParentEmail;

    @Column(name="student_parent_contactno")
    private String studentParentContactno;



}
