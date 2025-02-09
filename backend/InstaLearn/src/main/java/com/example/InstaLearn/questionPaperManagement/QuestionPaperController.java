package com.example.InstaLearn.questionPaperManagement;

import com.example.InstaLearn.questionPaperManagement.dto.QuestionPaperDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/QuestionPaper")
public class QuestionPaperController {

    private final QuestionPaperService questionPaperService;

    public QuestionPaperController(QuestionPaperService questionPaperService) {
        this.questionPaperService = questionPaperService;
    }

    @GetMapping
    public ResponseEntity<List<QuestionPaper>> findAllQuestionPaper(){
        return new ResponseEntity<>(questionPaperService.findAllQuestionPaper(),HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestionPaper> findQuestionPaperById(@PathVariable int id) {
        try {
            QuestionPaper questionPaper = questionPaperService.findQuestionPaperByIdOrThrow(id);
            return new ResponseEntity<>(questionPaper, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<String> saveQuestionPaper(@RequestBody QuestionPaperDto questionPaperDto) {
        boolean isCreated = questionPaperService.saveQuestionPaper(questionPaperDto);
        if (isCreated) {
            return new ResponseEntity<>("Successfully created QuestionPaper", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("QuestionPaper was not created", HttpStatus.BAD_REQUEST);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<String> updateQuestionPaper(@PathVariable int id,@RequestBody QuestionPaper questionPaper){
        boolean isUpdate = questionPaperService.updateQuestionPaper(id,questionPaper);
        if(isUpdate){
            return new ResponseEntity<>("Successfully Updated "+id+" Question Paper",HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuestionPaperById(@PathVariable int id){
        boolean isDelete = questionPaperService.deleteQuestionPaperById(id);
        if(isDelete){
            return new ResponseEntity<>("Delete "+id+" Question Paper successfully",HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }




}
