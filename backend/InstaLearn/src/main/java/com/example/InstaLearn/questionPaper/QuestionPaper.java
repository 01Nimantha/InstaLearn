package com.example.InstaLearn.questionPaper;

import com.example.InstaLearn.questionPaper.dto.Question;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Entity
@Table(name = "Question Paper")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionPaper {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private List<Question> question_pool;
    private String date;
    private String duration;
    private int marks;
    private String chapter;
}
