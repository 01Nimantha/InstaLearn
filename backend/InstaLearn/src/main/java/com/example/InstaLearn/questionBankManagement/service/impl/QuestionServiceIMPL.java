package com.example.InstaLearn.questionBankManagement.service.impl;

import com.example.InstaLearn.questionBankManagement.dto.QuestionDTO;
import com.example.InstaLearn.questionBankManagement.entity.Question;
import com.example.InstaLearn.questionBankManagement.repo.QuestionRepo;
import com.example.InstaLearn.questionBankManagement.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionServiceIMPL implements QuestionService {
    @Autowired
    private QuestionRepo questionRepo;

    @Override
    public String saveQuestion(QuestionDTO questionDTO) {
        Question question = new Question(
                questionDTO.getQuestionId(),
                questionDTO.getChapterName(),
                questionDTO.getQuestion(),
                questionDTO.getAnswerOne(),
                questionDTO.getAnswerTwo(),
                questionDTO.getAnswerThree(),
                questionDTO.getAnswerFour(),
                questionDTO.getCorrectAnswer()
        );
        questionRepo.save(question);
        return question.getQuestion();
    }
}
