package com.example.InstaLearn.userManagement.service.impl;

import com.example.InstaLearn.userManagement.dto.TeacherSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.TeacherUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Admin;
import com.example.InstaLearn.userManagement.entity.Teacher;
import com.example.InstaLearn.userManagement.repo.TeacherRepo;
import com.example.InstaLearn.userManagement.service.TeacherService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherServiceIMPL implements TeacherService {

    @Autowired
    private TeacherRepo teacherRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String saveTeacher(TeacherSaveRequestDTO teacherSaveRequestDTO) {
        Teacher teacher = modelMapper.map(teacherSaveRequestDTO, Teacher.class);
        teacherRepo.save(teacher);
        return teacher.getTeacherName() + " Saved successfully";
    }

    @Override
    public String updateTeacher(TeacherUpdateRequestDTO teacherUpdateRequestDTO) {
        if(teacherRepo.existsById(teacherUpdateRequestDTO.getTeacherId())) {
            Teacher teacher = teacherRepo.getReferenceById(teacherUpdateRequestDTO.getTeacherId());
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
    public TeacherSaveRequestDTO getTeacherById(String teacherId) {
        if(teacherRepo.existsById(teacherId)) {
            Teacher teacher = teacherRepo.getReferenceById(teacherId);
            TeacherSaveRequestDTO teacherSaveRequestDTO = new TeacherSaveRequestDTO(
                    teacher.getTeacherName(),
                    teacher.getTeacherEmail(),
                    teacher.getTeacherContactno(),
                    teacher.getTeacherAddress()
            );


            return teacherSaveRequestDTO;
        }
        else{
            throw new RuntimeException("No Teacher");
        }
    }
}
