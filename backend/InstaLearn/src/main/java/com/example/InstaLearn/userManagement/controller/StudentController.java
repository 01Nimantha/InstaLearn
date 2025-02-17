package com.example.InstaLearn.userManagement.controller;

import com.example.InstaLearn.userManagement.dto.StudentSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.StudentUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Student;
import com.example.InstaLearn.userManagement.service.StudentService;
import com.example.InstaLearn.userManagement.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/student")
@CrossOrigin
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/save-student-and-parent")
    public ResponseEntity<StandardResponse> saveStudentAndParent(@RequestBody StudentSaveRequestDTO studentSaveRequestDTO) {
        String message = studentService.saveStudentAndParent(studentSaveRequestDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(201,"success",message),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<StandardResponse> updateStudent(@PathVariable(value="id") String studentId, @RequestBody StudentUpdateRequestDTO studentUpdateRequestDTO) {
        String message = studentService.updateStudent(studentId,studentUpdateRequestDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"success",message),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<StandardResponse> deleteStudentAndParent(@PathVariable(value="id") String studentId) {
        String message = studentService.deleteStudentAndParent(studentId);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"success",message),
                HttpStatus.OK
        );
    }
    @GetMapping("/get-all-students")
    public ResponseEntity<List<Student>> getAllStudents(){
        return new ResponseEntity<>(studentService.getAllStudents(), HttpStatus.FOUND);
    }
    @GetMapping("/get-student-by/{id}")
    public Student getStudentById(@PathVariable(value="id") String studentId) {
        return studentService.getStudentById(studentId);

    }

}
