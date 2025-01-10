package com.example.InstaLearn.questionBankManagement.service;

import com.example.InstaLearn.questionBankManagement.dto.QuestionDTO;

public interface QuestionService {
    public String saveQuestion(QuestionDTO questionDTO);

    String updateQuestion(QuestionDTO questionDTO);
}
