package com.example.InstaLearn.questionPaperManagement;

import com.example.InstaLearn.questionPaperManagement.dto.QuestionPaperDto;
import com.example.InstaLearn.questionPaperManagement.external.FullQuestionPaper;
import com.example.InstaLearn.questionPaperManagement.external.Question;
import com.example.InstaLearn.questionPaperManagement.external.TimeAndPerformance;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
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

    @PostMapping("/CreateQuestionPaper/{numberOfQuestions}")
    public ResponseEntity<String> createQuestionPaper(@PathVariable int numberOfQuestions){
        boolean isCrete = questionPaperService.createQuestionPaper(numberOfQuestions);
        if(isCrete){
            return new ResponseEntity<>("Create Full QuestionPaper",HttpStatus.OK);
        }else {
            return new ResponseEntity<>("There is an error Creating Full QuestionPaper",HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{qpId}/{stId}")
    public ResponseEntity<List<Question>> getAllQuestionByqpIdandstId(@PathVariable int qpId,@PathVariable String stId){
        List<Question> questionList = questionPaperService.getAllQuestionByqpIdandstId(qpId,stId);
        if(questionList.isEmpty()){
            return new ResponseEntity<>(questionList,HttpStatus.BAD_REQUEST);
        }else {
            return new ResponseEntity<>(questionList,HttpStatus.OK);
        }
    }

    @GetMapping("/GetNewfullPaper/{stId}")
    public ResponseEntity<List<FullQuestionPaper>> getFullQuestionPaper(@PathVariable String stId){
            List<FullQuestionPaper> fullQuestionPaper =questionPaperService.getFullQuestionPaper(stId);
            if(fullQuestionPaper.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }else {
                return new ResponseEntity<>(fullQuestionPaper,HttpStatus.OK);
            }

    }

    @PutMapping("/UpdatefullPaper/{stId}")
    public ResponseEntity<String> updateFullQuestionPaper(@PathVariable String stId,@RequestBody List<FullQuestionPaper> fullQuestionPaper){
        boolean isUpdate = questionPaperService.updateFullQuestionPaper(stId,fullQuestionPaper);
        if(isUpdate){
            return new ResponseEntity<>("Update successfull",HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/GetfullPaper/{stId}/{qpId}")
    public ResponseEntity<List<FullQuestionPaper>> getFullQuestionPaperByStIdAndQpId(@PathVariable String stId,@PathVariable int qpId){
        List<FullQuestionPaper> fullQuestionPaper =questionPaperService.getFullQuestionPaperByStIdAndQpId(stId,qpId);
        if(fullQuestionPaper.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity<>(fullQuestionPaper,HttpStatus.OK);
        }

    }

    @GetMapping("/CalculateFullQuestionPaperMarks/{stId}/{qpId}")
    public ResponseEntity<String> calculateFullQuestionPaperMarks(@PathVariable String stId,@PathVariable int qpId){
        String data = questionPaperService.calculateFullQuestionPaperMarks(stId,qpId);
        if(data.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity<>(data,HttpStatus.OK);
        }
    }

    @GetMapping("/GetTimeAndPerformance/{stId}")
    public ResponseEntity<List<TimeAndPerformance>> GetMarksAndDate(@PathVariable String stId){
        List<TimeAndPerformance> data = questionPaperService.GetMarksAndDate(stId);
        if(data.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity<>(data,HttpStatus.OK);
        }
    }

}
