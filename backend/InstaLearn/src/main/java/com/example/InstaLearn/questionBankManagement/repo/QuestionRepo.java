package com.example.InstaLearn.questionBankManagement.repo;

import com.example.InstaLearn.questionBankManagement.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepo extends JpaRepository<Question, Integer> {
}
