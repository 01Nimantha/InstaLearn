package com.example.InstaLearn.classTypeManagement.entity;

import com.example.InstaLearn.attendanceManagement.entity.Attendance;
import com.example.InstaLearn.classTypeManagement.entity.enums.Type;
import com.example.InstaLearn.userManagement.entity.Student;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "class_type")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ClassType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "class_type_id", updatable = false, nullable = false)
    private long classTypeId;

    @Column(name="class_type_name")
    private String classTypeName;

    @Enumerated(EnumType.STRING)
    @Column(name="class_type" , nullable = false)
    private Type type;

    @ManyToMany(mappedBy = "classTypes")
    @JsonIgnore
    private List<Student> students;


}
