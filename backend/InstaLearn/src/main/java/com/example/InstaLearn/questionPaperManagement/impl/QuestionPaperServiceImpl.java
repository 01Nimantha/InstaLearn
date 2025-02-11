package com.example.InstaLearn.questionPaperManagement.impl;

import com.example.InstaLearn.questionPaperManagement.QuestionPaper;
import com.example.InstaLearn.questionPaperManagement.QuestionPaperRepository;
import com.example.InstaLearn.questionPaperManagement.QuestionPaperService;
import com.example.InstaLearn.questionPaperManagement.dto.QuestionPaperDto;
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
    public QuestionPaper findQuestionPaperByIdOrThrow(int id) {
        return questionPaperRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("QuestionPaper not found with id: " + id));
    }


    @Override
    public boolean saveQuestionPaper(QuestionPaperDto questionPaperDto) {
        try {
            // Convert DTO to Entity
            QuestionPaper questionPaper = new QuestionPaper();
            questionPaper.setDate(questionPaperDto.getDate());
            questionPaper.setDuration(questionPaperDto.getDuration());
            questionPaper.setMark(questionPaperDto.getMark());
            questionPaper.setChapter(questionPaperDto.getChapter());

            // Save the entity
            questionPaperRepository.save(questionPaper);
            return true;
        } catch (Exception e) {
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

    @Override
    public boolean createQuestionPaper(int id) {
        try{

            return true;
        }catch (Exception e){
            return false;
        }

    }


}
