package com.example.InstaLearn.userManagement.controller;

import com.example.InstaLearn.userManagement.dto.TeacherSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.TeacherUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Teacher;
import com.example.InstaLearn.userManagement.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    @PutMapping("/update")
    public String updateTeacher(@RequestBody TeacherUpdateRequestDTO teacherUpdateRequestDTO) {
        String  msg=teacherService.updateTeacher(teacherUpdateRequestDTO);
        return msg;
    }

    @DeleteMapping(
            path = "delete-teacher",
            params = "id"
    )
    public String deleteTeacher(@RequestParam(value = "id") String teacherId) {
        String deleted=teacherService.deleteTeacher(teacherId);
        return deleted;
    }

    @GetMapping(
            path="/get-by-id",
            params = "id"

    )
    public TeacherSaveRequestDTO getTeacherById(@RequestParam(value = "id") String teacherId) {
        TeacherSaveRequestDTO teacherSaveRequestDTO=teacherService.getTeacherById(teacherId);
        return teacherSaveRequestDTO ;
    }
}
