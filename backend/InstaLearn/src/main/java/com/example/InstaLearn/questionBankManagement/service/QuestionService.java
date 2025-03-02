package com.example.InstaLearn.questionBankManagement.service;

import com.example.InstaLearn.questionBankManagement.dto.QuestionDTO;
import com.example.InstaLearn.questionBankManagement.entity.Question;

import java.util.List;

public interface QuestionService {
    public String saveQuestion(QuestionDTO questionDTO);

    String updateQuestion(QuestionDTO questionDTO);

    QuestionDTO getQuestionById(int questionId);

    List<QuestionDTO> getAllQuestion();

    String deleteQuestion(int questionId);


    List<Question> getRandomQuestions(int id);
}
