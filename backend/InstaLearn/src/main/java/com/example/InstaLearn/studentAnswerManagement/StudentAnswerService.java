package com.example.InstaLearn.studentAnswerManagement;

import com.example.InstaLearn.questionPaperManagement.external.Question;
import com.example.InstaLearn.studentAnswerManagement.dto.StudentAnswerDto;

import java.util.List;

public interface StudentAnswerService {
    List<StudentAnswer> findAllStudentAnswer();

    StudentAnswer findStudentAnswerById(int id);

    boolean saveStudentAnswer(StudentAnswerDto studentAnswerDto);

    boolean updateStudentAnswerById(int id, StudentAnswerDto studentAnswerDto);

    boolean deleteStudentAnswerById(int id);

    List<Integer> getAllQuestionIDByqpIdandstId(int qp_id, String st_id);

    List<StudentAnswer> getAllQuestionsByqpIdandstId(int qpId, String stId);

    List<Integer> getAllQPID(String stid);
}
