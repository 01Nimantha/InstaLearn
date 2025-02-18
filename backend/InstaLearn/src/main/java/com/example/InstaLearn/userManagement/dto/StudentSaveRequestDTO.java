package com.example.InstaLearn.userManagement.dto;

import com.example.InstaLearn.userManagement.entity.Parent;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentSaveRequestDTO {
    private String studentName;
    private String studentEmail;
    private String studentContactno;
    private String studentAddress;
    private String studentParentName;
    private String studentParentEmail;
    private String studentParentContactno;
    //private boolean freeCard = false;
}
