package com.example.InstaLearn.questionBankManagement.controller;

import com.example.InstaLearn.questionBankManagement.dto.QuestionDTO;
import com.example.InstaLearn.questionBankManagement.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

}
