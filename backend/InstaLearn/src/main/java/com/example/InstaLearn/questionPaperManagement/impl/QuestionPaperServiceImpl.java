package com.example.InstaLearn.questionPaperManagement.impl;

import com.example.InstaLearn.questionPaperManagement.QuestionPaper;
import com.example.InstaLearn.questionPaperManagement.QuestionPaperRepository;
import com.example.InstaLearn.questionPaperManagement.QuestionPaperService;
import com.example.InstaLearn.questionPaperManagement.dto.QuestionPaperDto;
import com.example.InstaLearn.questionPaperManagement.external.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

            Student studentsdetals = restTemplate.getForObject(
                    "http://localhost:8085/api/v1/student/get-all-student-ids",
                    Student.class
            );

            String[] studentArray = studentsdetals.getData();

            if (studentArray == null || studentArray.length == 0) {
                System.err.println("No student IDs received from API.");
                return false;
            }


            QuestionPaper questionPaper = new QuestionPaper();
            LocalDateTime dateTime = LocalDateTime.now();
            // Define the formatter
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            // Format LocalDateTime
            String formattedDate = dateTime.format(formatter);
            questionPaper.setDate(formattedDate);
            questionPaper.setDuration("1 Hours");
            questionPaper = questionPaperRepository.save(questionPaper);

            if (questionPaper.getId() <0 ) {
                System.err.println("Failed to generate QuestionPaper ID.");
                return false;
            }

            for(String x : studentArray){
                for(Question y : questionsArray){
                    StudentAnswer studentAnswer = new StudentAnswer(
                            x,
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
        try{
            RestTemplate restTemplate = new RestTemplate();
            List<Integer> questionIds = restTemplate.getForObject("http://localhost:8085/StudentAnswer/{qpId}/{stId}", List.class, qpId, stId);
            List<Question> questionList=new ArrayList<>();
            for(int x:questionIds){
                Question question= restTemplate.getForObject("http://localhost:8085/api/v1/question/get-by-id?id="+x,Question.class);
                questionList.add(question);
            }
            return questionList;

        }catch (Exception e){
            return new ArrayList<Question>();
        }

    }

    @Override
    public List<FullQuestionPaper> getFullQuestionPaper(String stId) {
            try{
                List<FullQuestionPaper> fullQuestionPaperArrayList = new ArrayList<>();
                RestTemplate restTemplate = new RestTemplate();
                int qp_id = questionPaperRepository.findLastQuestionPaperId();
                FullStudentAnswer[] studentAnswerList = restTemplate.getForObject("http://localhost:8085/StudentAnswer/allAnswers/"+qp_id+"/"+stId,FullStudentAnswer[].class);
                for(FullStudentAnswer x : studentAnswerList){
                    Question question= restTemplate.getForObject("http://localhost:8085/api/v1/question/get-by-id?id="+x.getQ_id(),Question.class);
                    List<String> options = new ArrayList<>();
                    options.add(question.getOptionOne());
                    options.add(question.getOptionTwo());
                    options.add(question.getOptionThree());
                    options.add(question.getOptionFour());
                    FullQuestionPaper fullQuestionPaper = new FullQuestionPaper(
                            x.getId(),
                            question.getQuestion(),
                            options,
                            question.getCorrectAnswer(),
                            x.isDisable(),
                            x.isMark(),
                            x.getSt_answer()
                    );
                    fullQuestionPaperArrayList.add(fullQuestionPaper);
                }
                return  fullQuestionPaperArrayList;

            }catch (Exception e){
                return new ArrayList<FullQuestionPaper>();
            }


    }

    @Override
    public boolean updateFullQuestionPaper(String stId, List<FullQuestionPaper> fullQuestionPaper) {
        try{
            int qpid = questionPaperRepository.findLastQuestionPaperId();
            RestTemplate restTemplate = new RestTemplate();
            int[] qid = restTemplate.getForObject("http://localhost:8085/StudentAnswer/"+qpid+"/"+stId,int[].class);
            int i=0;
            for(FullQuestionPaper x : fullQuestionPaper ){
                StudentAnswer studentAnswer = new StudentAnswer(stId,x.getStudentAnswer(),qpid,qid[i],x.isMark(),x.isDisable());
                i++;
                restTemplate.put("http://localhost:8085/StudentAnswer/"+x.getId(),studentAnswer);
            }
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public List<FullQuestionPaper> getFullQuestionPaperByStIdAndQpId(String stId, int qpId) {
        try{
            List<FullQuestionPaper> fullQuestionPaperArrayList = new ArrayList<>();
            RestTemplate restTemplate = new RestTemplate();
            int qp_id = qpId;
            FullStudentAnswer[] studentAnswerList = restTemplate.getForObject("http://localhost:8085/StudentAnswer/allAnswers/"+qp_id+"/"+stId,FullStudentAnswer[].class);
            for(FullStudentAnswer x : studentAnswerList){
                Question question= restTemplate.getForObject("http://localhost:8085/api/v1/question/get-by-id?id="+x.getQ_id(),Question.class);
                List<String> options = new ArrayList<>();
                options.add(question.getOptionOne());
                options.add(question.getOptionTwo());
                options.add(question.getOptionThree());
                options.add(question.getOptionFour());
                FullQuestionPaper fullQuestionPaper = new FullQuestionPaper(
                        x.getId(),
                        question.getQuestion(),
                        options,
                        question.getCorrectAnswer(),
                        x.isDisable(),
                        x.isMark(),
                        x.getSt_answer()
                );
                fullQuestionPaperArrayList.add(fullQuestionPaper);
            }
            return  fullQuestionPaperArrayList;

        }catch (Exception e){
            return new ArrayList<FullQuestionPaper>();
        }
    }

    @Override
    public String calculateFullQuestionPaperMarks(String stId, int qpId) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            FullQuestionPaper[] fullQuestionPaperList = restTemplate.getForObject(
                    "http://localhost:8085/QuestionPaper/GetfullPaper/" + stId + "/" + qpId,
                    FullQuestionPaper[].class
            );

            int markscount = 0;
            int questioncount = 0;

            for (FullQuestionPaper x : fullQuestionPaperList) {
                if (x.isMark()) {
                    markscount++;
                }
                questioncount++;
            }

            if (questioncount == 0) {
                return "0";
            }

            double fullMark = ((double) markscount / questioncount) * 100;
            return String.format("%.0f", fullMark)+"%";
        } catch (Exception e){
            return null;
        }
    }



}
