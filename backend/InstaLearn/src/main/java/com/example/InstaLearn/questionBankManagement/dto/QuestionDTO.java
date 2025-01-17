package com.example.InstaLearn.questionBankManagement.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class QuestionDTO {
    private int questionId;
    private String chapterName;
    private String question;
    private String optionOne;
    private String optionTwo;
    private String optionThree;
    private String optionFour;
    private String correctAnswer;
}
