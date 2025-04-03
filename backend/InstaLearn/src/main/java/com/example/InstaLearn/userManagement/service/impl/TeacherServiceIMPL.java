package com.example.InstaLearn.userManagement.service.impl;

import com.example.InstaLearn.userManagement.dto.TeacherSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.TeacherUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Teacher;
import com.example.InstaLearn.userManagement.entity.User;
import com.example.InstaLearn.userManagement.entity.enums.Role;
import com.example.InstaLearn.userManagement.repo.TeacherRepo;
import com.example.InstaLearn.userManagement.repo.UserRepo;
import com.example.InstaLearn.userManagement.service.PasswordService;
import com.example.InstaLearn.userManagement.service.PasswordStorage;
import com.example.InstaLearn.userManagement.service.TeacherService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherServiceIMPL implements TeacherService {

    @Autowired
    private TeacherRepo teacherRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepo userRepo;

//    @Autowired
//    private PasswordService passwordService;

    @Override
    public String saveTeacher(TeacherSaveRequestDTO teacherSaveRequestDTO) {

        Teacher teacher = modelMapper.map(teacherSaveRequestDTO, Teacher.class);
        teacherRepo.save(teacher);

        User user = new User();
        user.setUserName(String.valueOf(teacher.getTeacherId()));// Set teacherId as userName
        user.setRole(Role.valueOf("TEACHER"));
//        String password=user.generatePassword();
//        System.out.println(password);
//        user.setUserPassword(passwordService.hashPassword(password));

        userRepo.save(user);

//        PasswordStorage.storePassword(user.getUserId(), password);

        // Associate the saved User with the Teacher entity
        teacher.setUser(user);
        teacherRepo.save(teacher);// Update Teacher with the associated User

        return teacher.getTeacherName() + " Saved successfully";
    }

    @Override
    public String updateTeacher(String teacherId, TeacherUpdateRequestDTO teacherUpdateRequestDTO){
        if(teacherRepo.existsById(teacherId)) {
            Teacher teacher = teacherRepo.getReferenceById(teacherId);

            teacher.setTeacherName(teacherUpdateRequestDTO.getTeacherName());
            teacher.setTeacherEmail(teacherUpdateRequestDTO.getTeacherEmail());
            teacher.setTeacherContactno(teacherUpdateRequestDTO.getTeacherContactno());
            teacher.setTeacherAddress(teacherUpdateRequestDTO.getTeacherAddress());
            teacherRepo.save(teacher);
            return teacherUpdateRequestDTO.getTeacherName() + " Updated Successfully";
        }
        else{
            throw new RuntimeException("No data found for that id");
        }
    }

    @Override
    public Page<Teacher> getAllTeachers(Pageable pageable) {
        return teacherRepo.findAll(pageable);
    }

    @Override
    public String deleteTeacher(String teacherId) {
        if (teacherRepo.existsById(teacherId)) {
            teacherRepo.deleteById(teacherId);
            return "Deleted Successfully "+teacherId;
        }
        else{
            throw new RuntimeException("No teacher found for that id");
        }
    }

    @Override
    public Teacher getTeacherById(String teacherId) {
        return teacherRepo.findById(teacherId).orElse(null);
    }

    @Override
    public Page<Teacher> searchTeachers(String searchTerm, Pageable pageable) {
        return teacherRepo.findByTeacherIdContainingOrTeacherNameContaining(
                searchTerm, searchTerm, pageable);
    }
}
