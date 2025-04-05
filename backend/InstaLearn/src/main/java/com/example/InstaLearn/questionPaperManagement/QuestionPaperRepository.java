package com.example.InstaLearn.questionPaperManagement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QuestionPaperRepository extends JpaRepository<QuestionPaper,Integer> {
    @Query("SELECT MAX(q.id) FROM QuestionPaper q")
    Integer findLastQuestionPaperId();
}
