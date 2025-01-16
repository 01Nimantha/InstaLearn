package com.example.InstaLearn.userManagement.service;

import com.example.InstaLearn.userManagement.dto.TeacherSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.TeacherUpdateRequestDTO;

public interface TeacherService {
    String saveTeacher(TeacherSaveRequestDTO teacherSaveRequestDTO) ;

    String updateTeacher(TeacherUpdateRequestDTO teacherUpdateRequestDTO);


    String deleteTeacher(String teacherId);

    TeacherSaveRequestDTO getTeacherById(int teacherId);

}
