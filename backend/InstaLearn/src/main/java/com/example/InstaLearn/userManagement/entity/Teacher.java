package com.example.InstaLearn.userManagement.entity;

import com.example.InstaLearn.userManagement.entity.idgenerator.AdminIdSequenceGenerator;
import com.example.InstaLearn.userManagement.entity.idgenerator.SAdminIdSequenceGenerator;
import com.example.InstaLearn.userManagement.entity.idgenerator.TeacherIdSequenceGenerator;
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
    @Column(name = "teacher_id", updatable = false, nullable = false)
    private String teacherId;

    @PrePersist
    private void generateId() {
        if (this.teacherId == null) {
            this.teacherId = generateTeacherId();
        }
    }
    private String generateTeacherId() {
        String prefix = "TH_2025_";
        int nextNumber = TeacherIdSequenceGenerator.getNextId();
        return prefix + String.format("%05d", nextNumber);
    }

    @Column(name="teacher_name")
    private String teacherName;

    @Column(name="teacher_email")
    private String teacherEmail;

    @Column(name="teacher_contactno")
    private String teacherContactno;

    @Column(name="teacher_address")
    private String teacherAddress;

}
