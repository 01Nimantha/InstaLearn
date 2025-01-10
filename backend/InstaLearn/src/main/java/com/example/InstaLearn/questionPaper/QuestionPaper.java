package com.example.InstaLearn.questionPaper;

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
    private String date;
    private String duration;
    private int mark;
    private String chapter;
}
