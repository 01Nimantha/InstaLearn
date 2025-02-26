package com.example.InstaLearn.studentAnswerManagement;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Student Answer")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "st_id")
    private String stId;  // Changed to camelCase

    private String st_answer;

    @Column(name = "qp_id")
    private int qpId;  // Changed to camelCase

    private int q_id;
    private boolean mark;
    private boolean disable;
}
