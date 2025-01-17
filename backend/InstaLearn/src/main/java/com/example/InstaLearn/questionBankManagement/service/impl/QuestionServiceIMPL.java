package com.example.InstaLearn.questionBankManagement.service.impl;

import com.example.InstaLearn.questionBankManagement.dto.QuestionDTO;
import com.example.InstaLearn.questionBankManagement.entity.Question;
import com.example.InstaLearn.questionBankManagement.repo.QuestionRepo;
import com.example.InstaLearn.questionBankManagement.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
                questionDTO.getOptionOne(),
                questionDTO.getOptionTwo(),
                questionDTO.getOptionThree(),
                questionDTO.getOptionFour(),
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
            question.setOptionOne(questionDTO.getOptionOne());
            question.setOptionTwo(questionDTO.getOptionTwo());
            question.setOptionThree(questionDTO.getOptionThree());
            question.setOptionFour(questionDTO.getOptionFour());
            question.setCorrectAnswer(questionDTO.getCorrectAnswer());


            questionRepo.save(question);
            return "Question Updated successfully";
        }
        else{
            throw new RuntimeException("Question Not Found");
        }
    }

    @Override
    public QuestionDTO getQuestionById(int questionId) {
        if(questionRepo.existsById(questionId)) {
            Question question=questionRepo.getReferenceById(questionId);
            QuestionDTO questionDTO=new QuestionDTO(
                    question.getQuestionId(),
                    question.getChapterName(),
                    question.getQuestion(),
                    question.getOptionOne(),
                    question.getOptionTwo(),
                    question.getOptionThree(),
                    question.getOptionFour(),
                    question.getCorrectAnswer()
            );
            return questionDTO;
        }
        else {
            throw new RuntimeException("Question Not Found");
        }
    }

    @Override
    public List<QuestionDTO> getAllQuestion() {
        List<Question> getAllQuestion=questionRepo.findAll();
        List<QuestionDTO> questionDTOList=new ArrayList<>();

        for(Question question:getAllQuestion){
            QuestionDTO questionDTO=new QuestionDTO(
                    question.getQuestionId(),
                    question.getChapterName(),
                    question.getQuestion(),
                    question.getOptionOne(),
                    question.getOptionTwo(),
                    question.getOptionThree(),
                    question.getOptionFour(),
                    question.getCorrectAnswer()
            );
            questionDTOList.add(questionDTO);
        }
        return questionDTOList;
    }

    @Override
    public String deleteQuestion(int questionId) {
        if(questionRepo.existsById(questionId)) {
            questionRepo.deleteById(questionId);
            return questionId+" Question Deleted successfully";
        }
        else {
            throw new RuntimeException("Question Not Found");
        }
    }
}
