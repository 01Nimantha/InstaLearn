package com.example.InstaLearn.studentAnswerManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class StudentAnswerDto {
    private String st_id;
    private String st_answer;
    private int qp_id;
    private int q_id;
}
