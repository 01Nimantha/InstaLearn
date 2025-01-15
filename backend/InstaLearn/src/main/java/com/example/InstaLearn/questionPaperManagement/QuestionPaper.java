package com.example.InstaLearn.questionPaperManagement;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private String date;
    private String duration;
    private int mark;
    private String chapter;
}
