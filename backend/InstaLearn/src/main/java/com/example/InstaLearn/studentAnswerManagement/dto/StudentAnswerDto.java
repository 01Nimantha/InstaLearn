package com.example.InstaLearn.studentAnswerManagement.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class StudentAnswerDto {
    @Column(name = "st_id")
    private String st_id;
    private String st_answer;
    @Column(name = "qp_id")
    private int qp_id;
    private int q_id;
    private boolean mark;
    private boolean disable;
}
