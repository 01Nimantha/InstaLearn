package com.example.InstaLearn.userManagement.service.impl;

import com.example.InstaLearn.userManagement.dto.StudentSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.StudentUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Parent;
import com.example.InstaLearn.userManagement.entity.Student;
import com.example.InstaLearn.userManagement.repo.ParentRepo;
import com.example.InstaLearn.userManagement.repo.StudentRepo;
import com.example.InstaLearn.userManagement.service.StudentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceIMPL implements StudentService {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private ParentRepo parentRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String saveStudentAndParent(StudentSaveRequestDTO studentSaveRequestDTO) {
        Parent parent = new Parent();

        parent.setParentName(studentSaveRequestDTO.getStudentParentName());
        parent.setParentEmail(studentSaveRequestDTO.getStudentParentEmail());
        parent.setParentContactno(studentSaveRequestDTO.getStudentParentContactno());
        parent.setParentAddress(studentSaveRequestDTO.getStudentAddress());

        Parent savedParent = parentRepo.save(parent);

        Student student = new Student();
        student.setParent(savedParent);
        student.setStudentName(studentSaveRequestDTO.getStudentName());
        student.setStudentEmail(studentSaveRequestDTO.getStudentEmail());
        student.setStudentContactno(studentSaveRequestDTO.getStudentContactno());
        student.setStudentAddress(studentSaveRequestDTO.getStudentAddress());
        student.setStudentParentName(studentSaveRequestDTO.getStudentParentName());
        student.setStudentParentEmail(studentSaveRequestDTO.getStudentParentEmail());
        student.setStudentParentContactno(studentSaveRequestDTO.getStudentParentContactno());
        student.setFreeCard(studentSaveRequestDTO.isFreeCard());

        studentRepo.save(student);

        return "Saved Successfully";
    }

    @Override
    public String updateStudent(String studentId, StudentUpdateRequestDTO studentUpdateRequestDTO) {
        if (studentRepo.existsById(studentId)) {

            Student student = studentRepo.getReferenceById(studentId);
            student.setStudentName(studentUpdateRequestDTO.getStudentName());
            student.setStudentEmail(studentUpdateRequestDTO.getStudentEmail());
            student.setStudentContactno(studentUpdateRequestDTO.getStudentContactno());
            student.setStudentAddress(studentUpdateRequestDTO.getStudentAddress());
            student.setStudentParentName(studentUpdateRequestDTO.getStudentParentName());
            student.setStudentParentEmail(studentUpdateRequestDTO.getStudentParentEmail());
            student.setStudentParentContactno(studentUpdateRequestDTO.getStudentParentContactno());
            student.setFreeCard(studentUpdateRequestDTO.isFreeCard());
            studentRepo.save(student);

            return student.getStudentName() + " updated successfully";
        } else {
            throw new RuntimeException("Student not found");
        }
    }

    @Override
    public String deleteStudentAndParent(String studentId) {
            if(studentRepo.existsById(studentId)){
                studentRepo.deleteById(studentId);
                parentRepo.deleteById(studentId);
                return studentId +" deleted successfully";
            }else{
                throw new RuntimeException("Student not found");
            }

    }
}
