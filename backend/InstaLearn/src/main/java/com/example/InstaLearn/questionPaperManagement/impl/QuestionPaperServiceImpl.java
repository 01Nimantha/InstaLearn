package com.example.InstaLearn.questionPaperManagement.impl;

import com.example.InstaLearn.questionPaperManagement.QuestionPaper;
import com.example.InstaLearn.questionPaperManagement.QuestionPaperRepository;
import com.example.InstaLearn.questionPaperManagement.QuestionPaperService;
import com.example.InstaLearn.questionPaperManagement.dto.QuestionPaperDto;
import com.example.InstaLearn.questionPaperManagement.external.Question;
import com.example.InstaLearn.questionPaperManagement.external.Student;
import com.example.InstaLearn.questionPaperManagement.external.StudentAnswer;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
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
            RestTemplate restTemplate = new RestTemplate();
            Question[] questionsArray = restTemplate.getForObject(
                    "http://localhost:8085/api/v1/question/" + id,
                    Question[].class
            );

            if (questionsArray == null || questionsArray.length == 0) {
                System.err.println("No questions received from API.");
                return false;
            }

            Student[] studentArray = restTemplate.getForObject(
                    "http://localhost:8085/api/v1/student/get-all-id",
                    Student[].class
            );

            if (studentArray == null || studentArray.length == 0) {
                System.err.println("No student IDs received from API.");
                return false;
            }

            QuestionPaper questionPaper = new QuestionPaper();

            for(Student x : studentArray){
                for(Question y : questionsArray){
                    StudentAnswer studentAnswer = new StudentAnswer(
                            x.getStudentID(),
                            "",
                            questionPaper.getId(),
                            y.getQuestionId(),
                            false,
                            false
                    );

                    restTemplate.postForLocation(
                            "http://localhost:8085/StudentAnswer",
                            studentAnswer
                    );
                }
            }

            return true;
        }catch (Exception e){
            return false;
        }

    }

    @Override
    public List<Question> getAllQuestionByqpIdandstId(int qpId, String stId) {
        RestTemplate restTemplate = new RestTemplate();
        List<Integer> questionIds = restTemplate.getForObject("http://localhost:8085/StudentAnswer/{qpId}/{stId}", List.class, qpId, stId);
        List<Question> questionList=new ArrayList<>();
        for(int x:questionIds){
            Question question= restTemplate.getForObject("http://localhost:8085/api/v1/question/get-by-id?id="+x,Question.class);
            questionList.add(question);
        }
        return questionList;
    }


}
