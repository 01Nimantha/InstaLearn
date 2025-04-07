package com.example.InstaLearn.questionPaperManagement.external;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class FullQuestionPaper {
    private int id;
    private String question;
    private List<String> options;
    private String correctAnswer;
    private boolean disable;
    private boolean mark;
    private String studentAnswer;

}
