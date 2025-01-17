package com.example.InstaLearn.studentAnswerManagement;

import com.example.InstaLearn.studentAnswerManagement.dto.StudentAnswerDto;

import java.util.List;

public interface StudentAnswerService {
    List<StudentAnswer> findAllStudentAnswer();

    StudentAnswer findStudentAnswerById(int id);

    boolean saveStudentAnswer(StudentAnswerDto studentAnswerDto);

    boolean updateStudentAnswerById(int id, StudentAnswerDto studentAnswerDto);

    boolean deleteStudentAnswerById(int id);
}
