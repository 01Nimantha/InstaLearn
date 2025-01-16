package com.example.InstaLearn.userManagement.entity;

import com.example.InstaLearn.userManagement.entity.idgenerator.AdminIdSequenceGenerator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="attendanceOfficer")
@AllArgsConstructor
@NoArgsConstructor
@Data

public class AttendanceOfficer {
    @Id
    @Column(name = "attendanceOfficer_id", updatable = false, nullable = false)
    private String attendanceOfficerId;

    @PrePersist
    private void generateId() {
        if (this.attendanceOfficerId == null) {
            this.attendanceOfficerId = generateAdminId();
        }
    }
    private String generateAdminId() {
        String prefix = "AO_2025_";
        int nextNumber = AdminIdSequenceGenerator.getNextId();
        return prefix + String.format("%05d", nextNumber);
    }

    @Column(name="attendanceOfficer_name")
    private String attendanceOfficerName;

    @Column(name="attendanceOfficer_email")
    private String attendanceOfficerEmail;

    @Column(name="attendanceOfficer_contactno")
    private String attendanceOfficerContactno;

    @Column(name="attendanceOfficer_address")
    private String attendanceOfficerAddress;

}
