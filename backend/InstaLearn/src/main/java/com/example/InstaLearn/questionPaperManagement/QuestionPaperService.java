package com.example.InstaLearn.questionPaperManagement;

import com.example.InstaLearn.questionPaperManagement.dto.QuestionPaperDto;
import com.example.InstaLearn.questionPaperManagement.external.FullQuestionPaper;
import com.example.InstaLearn.questionPaperManagement.external.Question;
import com.example.InstaLearn.questionPaperManagement.external.TimeAndPerformance;

import java.util.List;

public interface QuestionPaperService {
    List<QuestionPaper> findAllQuestionPaper();

    QuestionPaper findQuestionPaperByIdOrThrow(int id);

    boolean saveQuestionPaper(QuestionPaperDto questionPaper);

    boolean updateQuestionPaper(int id, QuestionPaper questionPaper);

    boolean deleteQuestionPaperById(int id);

    boolean createQuestionPaper(int numberOfQuestions);

    List<Question> getAllQuestionByqpIdandstId(int qpId, String stId);

    List<FullQuestionPaper> getFullQuestionPaper(String stId);


    boolean updateFullQuestionPaper(String stId, List<FullQuestionPaper> fullQuestionPaper);

    List<FullQuestionPaper> getFullQuestionPaperByStIdAndQpId(String stId, int qpId);

    String calculateFullQuestionPaperMarks(String stId, int qpId);

    List<TimeAndPerformance> GetMarksAndDate(String stId);
}
