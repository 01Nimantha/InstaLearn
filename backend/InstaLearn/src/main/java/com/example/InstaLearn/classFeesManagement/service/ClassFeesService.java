package com.example.InstaLearn.classFeesManagement.service;

import com.example.InstaLearn.classFeesManagement.ClassFeesSaveRequestDTO;
import com.example.InstaLearn.classFeesManagement.ClassFeesUpdateRequestDTO;
import com.example.InstaLearn.classFeesManagement.enity.ClassFees;

import java.util.List;

public interface ClassFeesService {

    String saveClassFees(ClassFeesSaveRequestDTO classFeesSaveRequestDTO);

    String updateClassFees(long classFeesId, ClassFeesUpdateRequestDTO classFeesUpdateRequestDTO);

    String deleteClassFees(long classFeesId);

    List<ClassFees> getAllClassFees();
}
