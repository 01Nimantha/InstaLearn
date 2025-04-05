package com.example.InstaLearn.studentAnswerManagement;

import com.example.InstaLearn.questionPaperManagement.external.Question;
import com.example.InstaLearn.studentAnswerManagement.dto.StudentAnswerDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/StudentAnswer")
public class StudentAnswerController {
    StudentAnswerService studentAnswerService;

    public StudentAnswerController(StudentAnswerService studentAnswerService) {
        this.studentAnswerService = studentAnswerService;
    }
    @GetMapping
    public ResponseEntity<List<StudentAnswer>> findAllStudentAnswer(){
        return new ResponseEntity<>(studentAnswerService.findAllStudentAnswer(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentAnswer> findStudentAnswerById(@PathVariable int id){
        try{
            StudentAnswer studentAnswer = studentAnswerService.findStudentAnswerById(id);
            return new ResponseEntity<>(studentAnswer,HttpStatus.OK);
        }catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping
    public ResponseEntity<String> saveStudentAnswer(@RequestBody StudentAnswerDto studentAnswerDto){
        boolean isSave = studentAnswerService.saveStudentAnswer(studentAnswerDto);
        if(isSave){
            return new ResponseEntity<>("Save Student Answer",HttpStatus.CREATED);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateStudentAnswerById(@PathVariable int id,@RequestBody StudentAnswerDto studentAnswerDto){
        boolean isUpdate = studentAnswerService.updateStudentAnswerById(id,studentAnswerDto);
        if(isUpdate){
            return new ResponseEntity<>("Student Answer is Updated",HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudentAnswerById(@PathVariable int id){
        boolean isDelete = studentAnswerService.deleteStudentAnswerById(id);
        if(isDelete){
            return new ResponseEntity<>("Student Answer is Deleted",HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{qp_id}/{st_id}")
    public ResponseEntity<List<Integer>> getAllQuestionIDByqpIdandstId(@PathVariable int qp_id, @PathVariable String st_id){
        List<Integer> questionList = studentAnswerService.getAllQuestionIDByqpIdandstId(qp_id,st_id);
        if(questionList.isEmpty()){
            return new ResponseEntity<>(questionList,HttpStatus.BAD_REQUEST);
        }else {
            return new ResponseEntity<>(questionList,HttpStatus.OK);
        }
    }

    @GetMapping("/allAnswers/{qp_id}/{st_id}")
    public ResponseEntity<List<StudentAnswer>> getAllQuestionsByqpIdandstId(@PathVariable int qp_id, @PathVariable String st_id){
        List<StudentAnswer> studentAnswerList = studentAnswerService.getAllQuestionsByqpIdandstId(qp_id,st_id);
        if(studentAnswerList.isEmpty()){
            return new ResponseEntity<>(studentAnswerList,HttpStatus.BAD_REQUEST);
        }else {
            return new ResponseEntity<>(studentAnswerList,HttpStatus.OK);
        }
    }

    @GetMapping("/GetAllQPID/{stid}")
    public ResponseEntity<List<Integer>> getAllQPID(@PathVariable String stid){
        List<Integer> data = studentAnswerService.getAllQPID(stid);
        if(data.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity<>(data,HttpStatus.OK);
        }
    }

}
