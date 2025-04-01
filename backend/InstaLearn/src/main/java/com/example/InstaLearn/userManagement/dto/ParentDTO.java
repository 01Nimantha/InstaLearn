package com.example.InstaLearn.userManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ParentDTO {

    private String parentId;
    private String parentEmail;
    private String parentName;
    private String parentContactno;
    private String parentAddress;
    private long userId;
}
