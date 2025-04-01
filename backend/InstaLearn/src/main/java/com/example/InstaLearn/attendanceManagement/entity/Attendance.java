package com.example.InstaLearn.attendanceManagement.entity;

import com.example.InstaLearn.classTypeManagement.entity.ClassType;
import com.example.InstaLearn.userManagement.entity.Student;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDate createdAt;

    @Column(name = "time_recorded")
    private LocalTime timeRecorded;

    @Column(name = "present_state")
    private boolean presentState;

    @ManyToOne
    @JoinColumn(name = "class_type_id", nullable = false)
    private ClassType classType;


}
