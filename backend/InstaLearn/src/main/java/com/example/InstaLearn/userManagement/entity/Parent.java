package com.example.InstaLearn.userManagement.entity;

import com.example.InstaLearn.userManagement.entity.idgenerator.ParentIdSequenceGenerator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @Column(name = "parent_id", updatable = false, nullable = false)
    private String parentId;

    @PrePersist
    private void generateId() {
        if (this.parentId == null) {
            this.parentId = generateParentId();
        }
    }
    private String generateParentId() {
        String prefix = "PR_2025_";
        int nextNumber = ParentIdSequenceGenerator.getNextId();
        return prefix + String.format("%05d", nextNumber);
    }

    @Column(name = "parent_name")
    private String parentName;

    @Column(name = "parent_email")
    private String parentEmail;

    @Column(name = "parent_contactno")
    private String parentContactno;

    @Column(name = "parent_address")
    private String parentAddress;

    @JsonManagedReference
    @OneToOne(mappedBy = "parent", cascade = CascadeType.ALL) // Bidirectional mapping
    private Student student;

    @OneToOne
    private User user;

}
