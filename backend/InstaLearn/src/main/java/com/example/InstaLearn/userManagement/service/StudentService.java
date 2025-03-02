package com.example.InstaLearn.userManagement.service;

import com.example.InstaLearn.attendanceManagement.dto.AttendanceDTO;
import com.example.InstaLearn.userManagement.dto.ParentDTO;
import com.example.InstaLearn.userManagement.dto.StudentDTO;
import com.example.InstaLearn.userManagement.dto.StudentSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.StudentUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Parent;
import com.example.InstaLearn.userManagement.entity.Student;

import java.util.List;

public interface StudentService {
    String saveStudentAndParent(StudentSaveRequestDTO studentSaveRequestDTO);

    String updateStudent(String studentId, StudentUpdateRequestDTO studentUpdateRequestDTO);

    String deleteStudentAndParent(String studentId);

    List<Student> getAllStudents();

    Student getStudentById(String studentId);

    long getTotalStudents();

    ParentDTO getParentByStudentId(String studentId);

    List<StudentDTO> getOnlyStudents();

    StudentDTO getOnlyStudentById(String studentId);

    List<String> getAllStudentIds();

}
