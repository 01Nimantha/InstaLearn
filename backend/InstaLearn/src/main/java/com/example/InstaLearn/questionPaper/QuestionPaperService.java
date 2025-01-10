package com.example.InstaLearn.questionPaper;

import java.util.List;
import java.util.Optional;

public interface QuestionPaperService {
    List<QuestionPaper> findAllQuestionPaper();

    Optional<QuestionPaper> findQuestionPaperById(int id);




    boolean updateQuestionPaper(int id, QuestionPaper questionPaper);

    boolean deleteQuestionPaperById(int id);
}
