package com.example.InstaLearn.questionPaperManagement;

import com.example.InstaLearn.questionPaperManagement.dto.QuestionPaperDto;
import com.example.InstaLearn.questionPaperManagement.external.FullQuestionPaper;
import com.example.InstaLearn.questionPaperManagement.external.Question;

import java.util.List;
import java.util.Optional;

public interface QuestionPaperService {
    List<QuestionPaper> findAllQuestionPaper();

    QuestionPaper findQuestionPaperByIdOrThrow(int id);

    boolean saveQuestionPaper(QuestionPaperDto questionPaper);

    boolean updateQuestionPaper(int id, QuestionPaper questionPaper);

    boolean deleteQuestionPaperById(int id);

    boolean createQuestionPaper(int id);

    List<Question> getAllQuestionByqpIdandstId(int qpId, String stId);

    List<FullQuestionPaper> getFullQuestionPaper(String stId);

}
