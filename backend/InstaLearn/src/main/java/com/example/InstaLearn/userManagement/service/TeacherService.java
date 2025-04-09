package com.example.InstaLearn.userManagement.service;

import com.example.InstaLearn.userManagement.dto.TeacherSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.TeacherUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Teacher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.List;

public interface TeacherService {
    String saveTeacher(TeacherSaveRequestDTO teacherSaveRequestDTO) ;

    String deleteTeacher(String teacherId);
    
    String updateTeacher(String teacherId, TeacherUpdateRequestDTO teacherUpdateRequestDTO);

    Page<Teacher> getAllTeachers(Pageable pageable);

    Teacher getTeacherById(String teacherId);

    Page<Teacher> searchTeachers(String searchTerm, Pageable pageable);
}
