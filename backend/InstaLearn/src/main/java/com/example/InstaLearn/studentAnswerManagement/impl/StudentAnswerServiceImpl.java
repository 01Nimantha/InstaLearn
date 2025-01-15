package com.example.InstaLearn.studentAnswerManagement.impl;

import com.example.InstaLearn.studentAnswerManagement.StudentAnswerRepository;
import com.example.InstaLearn.studentAnswerManagement.StudentAnswerService;
import org.springframework.stereotype.Service;

@Service
public class StudentAnswerServiceImpl implements StudentAnswerService {
    StudentAnswerRepository studentAnswerRepository;

    public StudentAnswerServiceImpl(StudentAnswerRepository studentAnswerRepository) {
        this.studentAnswerRepository = studentAnswerRepository;
    }

    
}
