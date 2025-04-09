package com.example.InstaLearn.userManagement.entity;

import com.example.InstaLearn.attendanceManagement.entity.Attendance;
import com.example.InstaLearn.classTypeManagement.entity.ClassType;
import com.example.InstaLearn.classTypeManagement.entity.enums.Type;
import com.example.InstaLearn.userManagement.entity.idgenerator.StudentIdSequenceGenerator;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name= "student")
@AllArgsConstructor
@NoArgsConstructor
@Data

public class Student {

    @Id
    @Column(name = "student_id", updatable = false, nullable = false)
    private String studentId;

    @PrePersist
    private void generateId() {
        if (this.studentId == null) {
            this.studentId = generateStudentId();
        }
    }
    private String generateStudentId() {
        String prefix = "ST_2025_";
        int nextNumber = StudentIdSequenceGenerator.getNextId();
        return prefix + String.format("%05d", nextNumber);
    }

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

    @Column(name="free_card")
    private boolean freeCard;

    @JsonBackReference
    @OneToOne(cascade = CascadeType.ALL) // One-to-one relationship with Parent
    @JoinColumn(name = "parent_id", referencedColumnName = "parent_id") // FK in Student table
    private Parent parent;

    @OneToOne
    private User user;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Attendance> attendanceRecords;

    @ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    @JoinTable(
            name = "class_type_student",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "class_type_id")
    )
    private List<ClassType> classTypes;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id", referencedColumnName = "imageId")
    private Image image;

}
