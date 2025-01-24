package com.example.InstaLearn.attendanceManagement.entity;

import com.example.InstaLearn.userManagement.entity.Student;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "attendance")
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "attendance_id")
    private int attendanceId;

    @Column(name = "class_type")
    private String classType;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "date")
    private Date date;

    @Column(name = "present_state")
    private boolean presentState;

}
