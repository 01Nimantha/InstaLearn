package com.example.InstaLearn.userManagement.dto;

import jakarta.mail.Multipart;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class TeacherUpdateRequestDTO {
    private String teacherName;
    private String teacherEmail;
    private String teacherContactno;
    private String teacherAddress;
}
