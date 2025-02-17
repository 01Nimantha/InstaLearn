package com.example.InstaLearn.userManagement.service;

import com.example.InstaLearn.userManagement.dto.StudentSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.StudentUpdateRequestDTO;

public interface StudentService {
    String saveStudentAndParent(StudentSaveRequestDTO studentSaveRequestDTO);

    String updateStudent(String studentId, StudentUpdateRequestDTO studentUpdateRequestDTO);

    String deleteStudentAndParent(String studentId);

    StudentSaveRequestDTO getStudentById(String studentId);
}
