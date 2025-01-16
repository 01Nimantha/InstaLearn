package com.example.InstaLearn.userManagement.entity;

import com.example.InstaLearn.userManagement.entity.idgenerator.AdminIdSequenceGenerator;
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
    @Column(name = "admin_id", updatable = false, nullable = false)
    private String adminId;

    @PrePersist
    private void generateId() {
        if (this.adminId == null) {
            this.adminId = generateAdminId();
        }
    }
    private String generateAdminId() {
        String prefix = "AD/2025/";
        int nextNumber = AdminIdSequenceGenerator.getNextId();
        return prefix + String.format("%05d", nextNumber);
    }

    @Column(name="admin_name")
    private String adminName;

    @Column(name="admin_email")
    private String adminEmail;

    @Column(name="admin_contactno")
    private String adminContactno;

    @Column(name="admin_address")
    private String adminAddress;


}


