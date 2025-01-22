package com.example.InstaLearn.userManagement.entity;

import com.example.InstaLearn.progressManagement.entity.Marks;
import com.example.InstaLearn.userManagement.entity.idgenerator.StudentIdSequenceGenerator;
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

    @Column(name="free_card",columnDefinition = "TINYINT default 1")
    private boolean freeCard;

    @OneToOne(cascade = CascadeType.ALL) // One-to-one relationship with Parent
    @JoinColumn(name = "parent_id", referencedColumnName = "parent_id") // FK in Student table
    private Parent parent;

<<<<<<< Updated upstream
    @OneToOne
    private User user;
=======
>>>>>>> Stashed changes
}
