package com.example.InstaLearn.userManagement.entity;

import com.example.InstaLearn.userManagement.entity.idgenerator.AdminIdSequenceGenerator;
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
    @Column(name = "sadmin_id", updatable = false, nullable = false)
    private String sadminId;

    @PrePersist
    private void generateId() {
        if (this.sadminId == null) {
            this.sadminId = generateAdminId();
        }
    }
    private String generateAdminId() {
        String prefix = "SAD_2025_";
        int nextNumber = AdminIdSequenceGenerator.getNextId();
        return prefix + String.format("%05d", nextNumber);
    }

    @Column(name = "sadmin_email")
    private String sadminEmail;

}
