package com.example.InstaLearn.questionBankManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="question")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Question {
    @Id
    @Column(name = "question_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int questionId;

    @Column(name = "chapter_name")
    private String chapterName;

    @Column(name = "question")
    private String question;

    @Column(name = "option_one")
    private String optionOne;

    @Column(name = "option_two")
    private String optionTwo;

    @Column(name = "option_three")
    private String optionThree;

    @Column(name = "option_four")
    private String optionFour;

    @Column(name = "correct_answer")
    private String correctAnswer;
}
