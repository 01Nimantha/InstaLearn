package com.example.InstaLearn.questionPaperManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class QuestionPaperDto {
    private String date;
    private String duration;
    private int mark;
    private String chapter;
}
