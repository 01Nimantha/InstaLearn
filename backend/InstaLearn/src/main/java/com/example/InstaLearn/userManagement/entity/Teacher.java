package com.example.InstaLearn.userManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "teacher")
@AllArgsConstructor
@NoArgsConstructor
@Data

public class Teacher {
    @Id
    @Column(name = "teacher_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int teacherId;

    @Column(name="teacher_name")
    private String teacherName;

    @Column(name="teacher_email")
    private String teacherEmail;

    @Column(name="teacher_contactno")
    private String teacherContactno;

    @Column(name="teacher_address")
    private String teacherAddress;

}
