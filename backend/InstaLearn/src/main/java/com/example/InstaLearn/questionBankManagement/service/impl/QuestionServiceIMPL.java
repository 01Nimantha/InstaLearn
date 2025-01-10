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

    @Override
    public String updateQuestion(QuestionDTO questionDTO) {
        if(questionRepo.existsById(questionDTO.getQuestionId())) {
            Question question=questionRepo.getReferenceById(questionDTO.getQuestionId());
            question.setChapterName(questionDTO.getChapterName());
            question.setQuestion(questionDTO.getQuestion());
            question.setAnswerOne(questionDTO.getAnswerOne());
            question.setAnswerTwo(questionDTO.getAnswerTwo());
            question.setAnswerThree(questionDTO.getAnswerThree());
            question.setAnswerFour(questionDTO.getAnswerFour());
            question.setCorrectAnswer(questionDTO.getCorrectAnswer());


            questionRepo.save(question);
            return "Question Updated successfully";
        }
        else{
            throw new RuntimeException("Question Not Found");
        }
    }
}
