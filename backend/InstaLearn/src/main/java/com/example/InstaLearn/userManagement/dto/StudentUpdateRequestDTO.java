package com.example.InstaLearn.userManagement.dto;

import com.example.InstaLearn.classTypeManagement.dto.ClassTypeSaveRequestDTO;
import com.example.InstaLearn.classTypeManagement.entity.ClassType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentUpdateRequestDTO {
    private String studentName;
    private String studentEmail;
    private String studentContactno;
    private String studentAddress;
    private String studentParentName;
    private String studentParentEmail;
    private String studentParentContactno;
    private boolean freeCard;
    private List<ClassTypeSaveRequestDTO> classTypes;
}
