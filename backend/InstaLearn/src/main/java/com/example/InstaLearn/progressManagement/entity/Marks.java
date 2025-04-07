package com.example.InstaLearn.progressManagement.entity;

import com.example.InstaLearn.userManagement.entity.Student;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "marks")
public class Marks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="mark_id")
    private long markId;

    @Column(name="marks")
    private double marks;

    @Column(name="month")
    private String month;

    @Column(name="student_id")
    private String studentId;

}
