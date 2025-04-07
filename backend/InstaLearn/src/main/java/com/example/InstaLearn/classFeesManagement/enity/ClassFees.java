package com.example.InstaLearn.classFeesManagement.enity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "class_fees")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ClassFees {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "class_fees_id", updatable = false, nullable = false)
    private long classFeesId;

    @Column(name = "class_name")
    private String className;

    @Column(name = "amount")
    private double amount;
}
