package com.example.InstaLearn.userManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class TeacherSaveRequestDTO {

    private String teacherName;
    private String teacherEmail;
    private String teacherContactno;
    private String teacherAddress;
}
