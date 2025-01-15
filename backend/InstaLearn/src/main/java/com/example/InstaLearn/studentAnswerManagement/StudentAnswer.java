package com.example.InstaLearn.studentAnswerManagement;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Student Answer")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int st_id;
    private String st_answer;
    private int qp_id;
    private int q_id;
}
