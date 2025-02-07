package com.example.InstaLearn.questionPaperManagement.external;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class Question {
    private int questionId;
    private String chapterName;
    private String question;

    private String optionOne;

    private String optionTwo;

    private String optionThree;

    private String optionFour;

    private String correctAnswer;
}
