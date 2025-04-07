package com.example.InstaLearn.questionBankManagement.controller;

import com.example.InstaLearn.questionBankManagement.dto.QuestionDTO;
import com.example.InstaLearn.questionBankManagement.entity.Question;
import com.example.InstaLearn.questionBankManagement.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/question")
@CrossOrigin
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @PostMapping("/save")

    public String saveQuestion(@RequestBody QuestionDTO questionDTO) {
        questionService.saveQuestion(questionDTO);
        return "saved";
    }
    @PutMapping("/update")
    public String updateQuestion(@RequestBody QuestionDTO questionDTO){
        String msg=questionService.updateQuestion(questionDTO);
        return msg;
    }
    @GetMapping(
            path="/get-by-id",
            params="id"
    )
    public QuestionDTO getQuestionById(@RequestParam(value="id") int questionId ){
        QuestionDTO questionDTO=questionService.getQuestionById(questionId);
        return questionDTO;
    }
    @GetMapping(
            path="/get-all-customer"
    )
    public List<QuestionDTO> getAllQuestion(){
        List<QuestionDTO> allqueestion=questionService.getAllQuestion();
        return allqueestion;
    }
    @DeleteMapping(
            path="delete-question/{id}"
    )
    public String deleteQuestion(@PathVariable(value="id") int questionId){
        String delete=questionService.deleteQuestion(questionId);
        return delete;
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Question>> getRandomQuestions(@PathVariable int id) {
        List<Question> questions = questionService.getRandomQuestions(id);
        if (!questions.isEmpty()) {
            return new ResponseEntity<>( questions,HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
        }
    }

}
