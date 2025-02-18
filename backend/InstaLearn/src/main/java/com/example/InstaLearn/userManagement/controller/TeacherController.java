package com.example.InstaLearn.userManagement.controller;

import com.example.InstaLearn.userManagement.dto.AdminUpdateRequestDTO;
import com.example.InstaLearn.userManagement.dto.TeacherSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.TeacherUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Parent;
import com.example.InstaLearn.userManagement.entity.Teacher;
import com.example.InstaLearn.userManagement.service.TeacherService;
import com.example.InstaLearn.userManagement.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/v1/teacher")
@CrossOrigin

public class TeacherController {
    @Autowired
    private TeacherService teacherService;

    @PostMapping("/save")
    public String saveTeacher(@RequestBody TeacherSaveRequestDTO teacherSaveRequestDTO) {
        teacherService.saveTeacher(teacherSaveRequestDTO);
        return "saved";

    }
    @PutMapping("/update/{id}")
    public ResponseEntity<StandardResponse> updateTeacher(@PathVariable(value="id") String teacherId, @RequestBody TeacherUpdateRequestDTO teacherUpdateRequestDTO){
        String message = teacherService.updateTeacher(teacherId,teacherUpdateRequestDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"success",message),
                HttpStatus.OK
        );
    }

    @DeleteMapping(
            path = "delete-teacher/{id}"
    )
    public String deleteTeacher(@PathVariable("id") String teacherId) {
        String deleted=teacherService.deleteTeacher(teacherId);
        return deleted;
    }

//    @GetMapping("/get-by/{id}")
//    public TeacherSaveRequestDTO getTeacherById(@PathVariable("id") String teacherId) {
//        TeacherSaveRequestDTO teacherSaveRequestDTO=teacherService.getTeacherById(teacherId);
//        return teacherSaveRequestDTO ;
//    }

    @GetMapping("/get-all-teachers")
    public ResponseEntity<List<Teacher>> getAllTeachers(){
        return new ResponseEntity<>(teacherService.getAllTeachers(), HttpStatus.FOUND);
    }

    @GetMapping("/get-teacher-by/{id}")
    public Teacher getTeacherById(@PathVariable(value="id") String teacherId) {
        return teacherService.getTeacherById(teacherId);

    }
}
