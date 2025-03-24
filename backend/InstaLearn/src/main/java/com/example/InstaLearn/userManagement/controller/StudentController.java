package com.example.InstaLearn.userManagement.controller;

import com.example.InstaLearn.attendanceManagement.dto.AttendanceDTO;
import com.example.InstaLearn.userManagement.dto.ParentDTO;
import com.example.InstaLearn.userManagement.dto.StudentDTO;
import com.example.InstaLearn.userManagement.dto.StudentSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.StudentUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.AttendanceOfficer;
import com.example.InstaLearn.userManagement.entity.Student;
import com.example.InstaLearn.userManagement.service.StudentService;
import com.example.InstaLearn.userManagement.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public ResponseEntity<Page<Student>> getAllStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ){
        Pageable pageable = PageRequest.of(page, size);

        Page<Student> students = studentService.getAllStudents(pageable);

        return new ResponseEntity<>(students, HttpStatus.OK);
    }
    @GetMapping("/get-student-by/{id}")
    public Student getStudentById(@PathVariable(value="id") String studentId) {
        return studentService.getStudentById(studentId);

    }
    @GetMapping("/get-parent-by-student/{id}")
    public ParentDTO getParentByStudentId(@PathVariable(value="id") String studentId) {
        return studentService.getParentByStudentId(studentId);

    }

    @GetMapping("/total-students")
    public ResponseEntity<Long> getTotalStudents() {
        long totalStudents = studentService.getTotalStudents();
        return ResponseEntity.ok(totalStudents);
    }

    @GetMapping("/get-only-students")
    public ResponseEntity<StandardResponse> getOnlyStudents(){
        List<StudentDTO> allStudents = studentService.getOnlyStudents();


        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"success",allStudents),
                HttpStatus.OK
        );
    }
    @GetMapping("/get-only-student-by/{id}")
    public StudentDTO getOnlyStudentById(@PathVariable(value="id") String studentId) {
        return studentService.getOnlyStudentById(studentId);

    }

    @GetMapping("/get-all-student-ids")
    public ResponseEntity<StandardResponse> getAllStudentIds(){
        List<String> allStudentIds = studentService.getAllStudentIds();
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"success",allStudentIds),
                HttpStatus.OK
        );
    }

}
