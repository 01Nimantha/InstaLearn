package com.example.InstaLearn.userManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ParentUpdateRequestDTO {

    private String parentName;
    private String parentEmail;
    private String parentContactno;
    private String parentAddress;
}
