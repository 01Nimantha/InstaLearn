package com.example.InstaLearn.classTypeManagement.service.impl;

import com.example.InstaLearn.classTypeManagement.dto.ClassTypeSaveRequestDTO;
import com.example.InstaLearn.classTypeManagement.entity.ClassType;
import com.example.InstaLearn.classTypeManagement.entity.enums.Type;
import com.example.InstaLearn.classTypeManagement.repo.ClassTypeRepo;
import com.example.InstaLearn.classTypeManagement.service.ClassTypeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassTypeServiceIMPL implements ClassTypeService {
    @Autowired
    private ClassTypeRepo classTypeRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String saveClassType(ClassTypeSaveRequestDTO classTypeSaveRequestDTO) {
        ClassType classType = modelMapper.map(classTypeSaveRequestDTO, ClassType.class);
        classTypeRepo.save(classType);
        return "Class Type saved successfully";
    }

    @Override
    public String updateClassType(long classTypeId, ClassTypeSaveRequestDTO classTypeSaveRequestDTO) {
        if (classTypeRepo.existsById(classTypeId)) {

            ClassType classType = classTypeRepo.getReferenceById(classTypeId);
            modelMapper.map(classTypeSaveRequestDTO, classType);
            classTypeRepo.save(classType);

            return classType.getClassTypeName() + " updated successfully";
        } else {
            throw new RuntimeException("Class type not found");
        }
    }

    @Override
    public String deleteClassType(long classTypeId) {
        if (classTypeRepo.existsById(classTypeId)) {
            classTypeRepo.deleteById(classTypeId);
            return classTypeId + " deleted successfully";
        } else {
            throw new RuntimeException("Class type not found");
        }
    }

    @Override
    public List<ClassType> getAllClasses() {
        return classTypeRepo.findAll();
    }

    @Override
    public List<String> getAllClassNames() {
        return classTypeRepo.findAllClassNames()
                .stream()
                .distinct() // Removes duplicates
                .toList(); // Converts back to List
    }

    @Override
    public List<String> getAllClassTypes() {
        return classTypeRepo.findAllClassTypes()
                .stream()
                .distinct()
                .toList();
    }

    @Override
    public Long getClassTypeId(String className, Type type) {
        return classTypeRepo.findClassTypeIdByClassNameAndClassType(className, type)
                .orElseThrow(() -> new RuntimeException("ClassType not found"));
    }

//    public List<ClassType> getClassTypesByStudentNumber(String studentNumber) {
//        return classTypeRepo.findByStudentNumber(studentNumber);
//    }


}
