package com.example.InstaLearn.questionPaperManagement;

import com.example.InstaLearn.questionPaperManagement.dto.QuestionPaperDto;

import java.util.List;
import java.util.Optional;

public interface QuestionPaperService {
    List<QuestionPaper> findAllQuestionPaper();

    QuestionPaper findQuestionPaperByIdOrThrow(int id);

    boolean saveQuestionPaper(QuestionPaperDto questionPaper);

    boolean updateQuestionPaper(int id, QuestionPaper questionPaper);

    boolean deleteQuestionPaperById(int id);

    boolean createQuestionPaper(int id);
}
