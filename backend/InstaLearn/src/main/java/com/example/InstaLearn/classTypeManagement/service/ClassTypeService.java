package com.example.InstaLearn.classTypeManagement.service;

import com.example.InstaLearn.classTypeManagement.dto.ClassTypeSaveRequestDTO;
import com.example.InstaLearn.classTypeManagement.entity.ClassType;
import com.example.InstaLearn.classTypeManagement.entity.enums.Type;

import java.util.List;

public interface ClassTypeService {
    String saveClassType(ClassTypeSaveRequestDTO classTypeSaveRequestDTO);


    String updateClassType(long classTypeId, ClassTypeSaveRequestDTO classTypeSaveRequestDTO);

    String deleteClassType(long classTypeId);

    List<ClassType> getAllClasses();

    List<String> getAllClassNames();

    List<String> getAllClassTypes();

    Long getClassTypeId(String className, Type type);
//    List<ClassType> getClassTypesByStudentNumber(String studentNumber);
}
