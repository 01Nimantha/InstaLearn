package com.example.InstaLearn.questionPaper;

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
    public ResponseEntity<QuestionPaper> findQuestionPaperById(@PathVariable int id){
        Optional<QuestionPaper> questionPaper = questionPaperService.findQuestionPaperById(id);
        if(questionPaper.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity<>(questionPaper.get(),HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping
    public ResponseEntity<String> postQuestionPaper(@RequestBody QuestionPaper questionPaper){
        boolean isPost= questionPaperService.postQuestionPaper(questionPaper);
        if(isPost){
            return new ResponseEntity<>("Successfully Updated Question Paper",HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
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
