package com.example.InstaLearn.questionPaperManagement.external;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class FullStudentAnswer {
    private int id;
    private String st_id;
    private String st_answer;
    private int qp_id;
    private int q_id;
    private boolean mark;
    private boolean disable;
}
