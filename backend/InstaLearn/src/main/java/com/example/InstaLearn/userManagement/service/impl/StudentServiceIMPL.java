package com.example.InstaLearn.userManagement.service.impl;

import com.example.InstaLearn.userManagement.dto.StudentSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.StudentUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Parent;
import com.example.InstaLearn.userManagement.entity.Student;
import com.example.InstaLearn.userManagement.entity.User;
import com.example.InstaLearn.userManagement.entity.enums.Role;
import com.example.InstaLearn.userManagement.repo.ParentRepo;
import com.example.InstaLearn.userManagement.repo.StudentRepo;
import com.example.InstaLearn.userManagement.repo.UserRepo;
import com.example.InstaLearn.userManagement.service.StudentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceIMPL implements StudentService {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private ParentRepo parentRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepo userRepo;

    @Override
    public String saveStudentAndParent(StudentSaveRequestDTO studentSaveRequestDTO) {
        Parent parent = new Parent();
        parent.setParentName(studentSaveRequestDTO.getStudentParentName());
        parent.setParentEmail(studentSaveRequestDTO.getStudentParentEmail());
        parent.setParentContactno(studentSaveRequestDTO.getStudentParentContactno());
        parent.setParentAddress(studentSaveRequestDTO.getStudentAddress());
        Parent savedParent = parentRepo.save(parent);

        User user1 = new User();
        user1.setUserName(String.valueOf(parent.getParentId()));// Set parentId as userName
        user1.setRole(Role.valueOf("PARENT"));
        userRepo.save(user1);

        // Associate the saved User with the Parent entity
        parent.setUser(user1);
        parentRepo.save(parent);// Update Parent with the associated User

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

        User user2 = new User();
        user2.setUserName(String.valueOf(student.getStudentId()));// Set studentId as userName
        user2.setRole(Role.valueOf("STUDENT"));
        userRepo.save(user2);

        // Associate the saved User with the Student entity
        student.setUser(user2);
        studentRepo.save(student);// Update Student with the associated User

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

    @Override
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    @Override
    public Student getStudentById(String studentId) {
        return studentRepo.findById(studentId).orElse(null);
    }

}
