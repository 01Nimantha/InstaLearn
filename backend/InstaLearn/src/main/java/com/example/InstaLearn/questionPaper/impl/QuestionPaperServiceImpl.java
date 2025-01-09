package com.example.InstaLearn.questionPaper.impl;

import com.example.InstaLearn.questionPaper.QuestionPaper;
import com.example.InstaLearn.questionPaper.QuestionPaperRepository;
import com.example.InstaLearn.questionPaper.QuestionPaperService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionPaperServiceImpl implements QuestionPaperService {

    QuestionPaperRepository questionPaperRepository;

    public QuestionPaperServiceImpl(QuestionPaperRepository questionPaperRepository) {
        this.questionPaperRepository = questionPaperRepository;
    }

    @Override
    public List<QuestionPaper> findAllQuestionPaper() {
        return questionPaperRepository.findAll();
    }

    @Override
    public Optional<QuestionPaper> findQuestionPaperById(int id) {
        return questionPaperRepository.findById(id);
    }

    @Override
    public boolean postQuestionPaper(QuestionPaper questionPaper) {
        try {
            questionPaperRepository.save(questionPaper);
            return true;
        }catch (Exception e){
            return false;
        }

    }

    @Override
    public boolean updateQuestionPaper(int id, QuestionPaper questionPaper) {
        try {
            Optional<QuestionPaper> questionPaper1= questionPaperRepository.findById(id);
            if(questionPaper1.isEmpty()){
                throw new Exception();
            }
            QuestionPaper x = questionPaper1.get();
            x.setId(questionPaper.getId());
            x.setQuestion_pool(questionPaper.getQuestion_pool());
            x.setDate(questionPaper.getDate());
            x.setDuration(questionPaper.getDuration());
            x.setMark(questionPaper.getMark());
            x.setChapter(questionPaper.getChapter());
            questionPaperRepository.save(x);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean deleteQuestionPaperById(int id) {
        try {
            questionPaperRepository.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
