package com.example.InstaLearn.studentAnswerManagement.impl;

import com.example.InstaLearn.studentAnswerManagement.StudentAnswer;
import com.example.InstaLearn.studentAnswerManagement.StudentAnswerRepository;
import com.example.InstaLearn.studentAnswerManagement.StudentAnswerService;
import com.example.InstaLearn.studentAnswerManagement.dto.StudentAnswerDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentAnswerServiceImpl implements StudentAnswerService {
    StudentAnswerRepository studentAnswerRepository;

    public StudentAnswerServiceImpl(StudentAnswerRepository studentAnswerRepository) {
        this.studentAnswerRepository = studentAnswerRepository;
    }


    @Override
    public List<StudentAnswer> findAllStudentAnswer() {
        return studentAnswerRepository.findAll();
    }

    @Override
    public StudentAnswer findStudentAnswerById(int id) {
        return studentAnswerRepository.findById(id).orElseThrow(() -> new RuntimeException("QuestionPaper not found with id: " + id));
    }

    @Override
    public boolean saveStudentAnswer(StudentAnswerDto studentAnswerDto) {
        try {
            StudentAnswer studentAnswer = new StudentAnswer();
            studentAnswer.setSt_id(studentAnswerDto.getSt_id());
            studentAnswer.setSt_answer(studentAnswerDto.getSt_answer());
            studentAnswer.setQ_id(studentAnswerDto.getQ_id());
            studentAnswer.setQp_id(studentAnswerDto.getQp_id());
            studentAnswerRepository.save(studentAnswer);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean updateStudentAnswerById(int id, StudentAnswerDto studentAnswerDto) {
        try {
            StudentAnswer studentAnswer = studentAnswerRepository.findById(id).orElseThrow(() -> new RuntimeException("QuestionPaper not found with id: " + id));
            studentAnswer.setSt_id(studentAnswerDto.getSt_id());
            studentAnswer.setSt_answer(studentAnswerDto.getSt_answer());
            studentAnswer.setQ_id(studentAnswerDto.getQ_id());
            studentAnswer.setQp_id(studentAnswerDto.getQp_id());
            studentAnswerRepository.save(studentAnswer);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean deleteStudentAnswerById(int id) {
        try {
            studentAnswerRepository.deleteById(id);
            return true;
        }catch (Exception e) {
            return false;
        }
    }
}
