package com.example.InstaLearn.userManagement.service;

import com.example.InstaLearn.userManagement.dto.TeacherSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.TeacherUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Teacher;

import java.io.IOException;
import java.util.List;

public interface TeacherService {
    String saveTeacher(TeacherSaveRequestDTO teacherSaveRequestDTO) ;

    String deleteTeacher(String teacherId);
    
    String updateTeacher(String teacherId, TeacherUpdateRequestDTO teacherUpdateRequestDTO);

    List<Teacher> getAllTeachers();

    Teacher getTeacherById(String teacherId);
}
