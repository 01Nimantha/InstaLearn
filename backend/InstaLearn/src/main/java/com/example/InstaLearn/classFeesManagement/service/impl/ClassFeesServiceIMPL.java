package com.example.InstaLearn.classFeesManagement.service.impl;

import com.example.InstaLearn.classFeesManagement.ClassFeesSaveRequestDTO;
import com.example.InstaLearn.classFeesManagement.ClassFeesUpdateRequestDTO;
import com.example.InstaLearn.classFeesManagement.enity.ClassFees;
import com.example.InstaLearn.classFeesManagement.repo.ClassFeesRepo;
import com.example.InstaLearn.classFeesManagement.service.ClassFeesService;
import com.example.InstaLearn.classTypeManagement.entity.ClassType;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClassFeesServiceIMPL implements ClassFeesService {

    @Autowired
    private ClassFeesRepo classFeesRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String saveClassFees(ClassFeesSaveRequestDTO classFeesSaveRequestDTO) {
        // Check if a class fee with the same class name already exists
        Optional<ClassFees> existingClassFees = classFeesRepo.findByClassName(classFeesSaveRequestDTO.getClassName());

        if (existingClassFees.isPresent()) {
            return "Class Fees for class '" + classFeesSaveRequestDTO.getClassName() + "' already exists";
        }

        // Save new class fees if not exists
        ClassFees classFees = modelMapper.map(classFeesSaveRequestDTO, ClassFees.class);
        classFeesRepo.save(classFees);
        return "Class Fees saved successfully";
    }


    @Override
    public String updateClassFees(long classFeesId, ClassFeesUpdateRequestDTO classFeesUpdateRequestDTO) {
        if (classFeesRepo.existsById(classFeesId)) {

            ClassFees classFees = classFeesRepo.getReferenceById(classFeesId);
            modelMapper.map(classFeesUpdateRequestDTO, classFees);
            classFeesRepo.save(classFees);

            return classFees.getClassName() + " updated successfully";
        } else {
            throw new RuntimeException("Class Fees not found");
        }
    }

    @Override
    public String deleteClassFees(long classFeesId) {
        if (classFeesRepo.existsById(classFeesId)) {
            classFeesRepo.deleteById(classFeesId);
            return classFeesId + " deleted successfully";
        } else {
            throw new RuntimeException("Class Fees not found");
        }
    }

    @Override
    public List<ClassFees> getAllClassFees() {
        return classFeesRepo.findAll();
    }

    @Override
    public Double getAmountByClassName(String className) {
        ClassFees classFees = classFeesRepo.findAmountByClassName(className);
        if (classFees != null) {
            return classFees.getAmount();
        } else {
            throw new RuntimeException("Class not found with name: " + className);
        }
    }
}
