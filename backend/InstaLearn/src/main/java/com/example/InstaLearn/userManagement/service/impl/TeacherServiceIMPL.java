package com.example.InstaLearn.userManagement.service.impl;

import com.example.InstaLearn.userManagement.dto.TeacherSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.TeacherUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Teacher;
import com.example.InstaLearn.userManagement.repo.TeacherRepo;
import com.example.InstaLearn.userManagement.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherServiceIMPL implements TeacherService {

    @Autowired
    private TeacherRepo teacherRepo;

    @Override
    public String saveTeacher(TeacherSaveRequestDTO teacherSaveRequestDTO) {
        Teacher teacher = new Teacher(
                teacherSaveRequestDTO.getTeacherId(),
                teacherSaveRequestDTO.getTeacherName(),
                teacherSaveRequestDTO.getTeacherEmail(),
                teacherSaveRequestDTO.getTeacherContactno(),
                teacherSaveRequestDTO.getTeacherAddress()
        );

        teacherRepo.save(teacher);

        return teacherSaveRequestDTO.getTeacherName();
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
    public String deleteTeacher(int teacherId) {
        if (teacherRepo.existsById(teacherId)) {
            teacherRepo.deleteById(teacherId);
            return "Deleted Successfully "+teacherId;
        }
        else{
            throw new RuntimeException("No customer found for that id");
        }
    }
}
