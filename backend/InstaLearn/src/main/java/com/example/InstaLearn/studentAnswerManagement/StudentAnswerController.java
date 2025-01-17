package com.example.InstaLearn.studentAnswerManagement;

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

}
