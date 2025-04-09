package com.example.InstaLearn.classTypeManagement.dto;

import com.example.InstaLearn.classTypeManagement.entity.enums.Type;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ClassTypeSaveRequestDTO {

    private String classTypeName;
    private Type type;
}
