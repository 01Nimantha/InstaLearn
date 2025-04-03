package com.example.InstaLearn.userManagement.service.impl;

import com.example.InstaLearn.attendanceManagement.dto.AttendanceDTO;
import com.example.InstaLearn.classTypeManagement.dto.ClassTypeSaveRequestDTO;
import com.example.InstaLearn.classTypeManagement.entity.ClassType;
import com.example.InstaLearn.classTypeManagement.repo.ClassTypeRepo;
import com.example.InstaLearn.userManagement.dto.ParentDTO;
import com.example.InstaLearn.userManagement.dto.StudentDTO;
import com.example.InstaLearn.userManagement.dto.StudentSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.StudentUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Parent;
import com.example.InstaLearn.userManagement.entity.Student;
import com.example.InstaLearn.userManagement.entity.User;
import com.example.InstaLearn.userManagement.entity.enums.Role;
import com.example.InstaLearn.userManagement.repo.ParentRepo;
import com.example.InstaLearn.userManagement.repo.StudentRepo;
import com.example.InstaLearn.userManagement.repo.UserRepo;
import com.example.InstaLearn.userManagement.service.PasswordService;
import com.example.InstaLearn.userManagement.service.PasswordStorage;
import com.example.InstaLearn.userManagement.service.StudentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    @Autowired
    private ClassTypeRepo classTypeRepo;

    @Autowired
    private PasswordService passwordService;

    @Override
    public String saveStudentAndParent(StudentSaveRequestDTO studentSaveRequestDTO) {
        // Ensure classTypes is not null
        if (studentSaveRequestDTO.getClassTypes() == null) {
            studentSaveRequestDTO.setClassTypes(new ArrayList<>());
        }

        // Save Parent
        Parent parent = new Parent();
        parent.setParentName(studentSaveRequestDTO.getStudentParentName());
        parent.setParentEmail(studentSaveRequestDTO.getStudentParentEmail());
        parent.setParentContactno(studentSaveRequestDTO.getStudentParentContactno());
        parent.setParentAddress(studentSaveRequestDTO.getStudentAddress());
        Parent savedParent = parentRepo.save(parent);

        // Save User for Parent
        User user1 = new User();
        user1.setUserName(String.valueOf(parent.getParentId())); // Set parentId as userName
        user1.setRole(Role.valueOf("PARENT"));

//        String password=user1.generatePassword();
//        System.out.println(password);
//        user1.setUserPassword(passwordService.hashPassword(password));

        userRepo.save(user1);
//        PasswordStorage.storePassword(user1.getUserId(), password);

        // Associate User with Parent
        parent.setUser(user1);
        parentRepo.save(parent);

        // Save Student
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

        // Process ClassTypes
        List<ClassType> classTypes = new ArrayList<>();
        for (ClassTypeSaveRequestDTO classTypeDTO : studentSaveRequestDTO.getClassTypes()) {
            Optional<ClassType> existingClassType = classTypeRepo.findByClassTypeNameAndType(
                    classTypeDTO.getClassTypeName(), classTypeDTO.getType());

            ClassType classType;
            if (existingClassType.isPresent()) {
                classType = existingClassType.get();
            } else {
                classType = new ClassType();
                classType.setClassTypeName(classTypeDTO.getClassTypeName());
                classType.setType(classTypeDTO.getType());
                classTypeRepo.save(classType);
            }
            classTypes.add(classType);
        }
        student.setClassTypes(classTypes); // Assign ClassTypes to Student
        studentRepo.save(student);

        // Save User for Student
        User user2 = new User();
        user2.setUserName(String.valueOf(student.getStudentId())); // Set studentId as userName
        user2.setRole(Role.valueOf("STUDENT"));

//        String password1=user2.generatePassword();
//        System.out.println(password1);
//        user1.setUserPassword(passwordService.hashPassword(password1));

        userRepo.save(user2);

        // Associate User with Student
//        PasswordStorage.storePassword(user1.getUserId(), password1);

        // Associate the saved User with the Student entity
        student.setUser(user2);
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

            // Find existing ClassTypes based on name & type
            List<ClassType> existingClassTypes = studentUpdateRequestDTO.getClassTypes().stream()
                    .map(classTypeDTO -> classTypeRepo.findByClassTypeNameAndType(
                                    classTypeDTO.getClassTypeName(), classTypeDTO.getType())
                            .orElseThrow(() -> new RuntimeException(
                                    "ClassType not found: " + classTypeDTO.getClassTypeName() + " - " + classTypeDTO.getType())))
                    .toList();

            // Prevent modification of an immutable list
            if (student.getClassTypes() == null) {
                student.setClassTypes(new ArrayList<>()); // Ensure a mutable list
            } else {
                student.getClassTypes().clear(); // Clear the existing list
            }

            student.getClassTypes().addAll(existingClassTypes); // Add new class types

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
    public Page<Student> getAllStudents(Pageable pageable) {
        return studentRepo.findAll(pageable);
    }

    @Override
    public Student getStudentById(String studentId) {
        return studentRepo.findById(studentId).orElse(null);
    }

    @Override

    public long getTotalStudents() {
        return studentRepo.count();
    }
    @Override

    public ParentDTO getParentByStudentId(String studentId) {
        Student student = studentRepo.findById(studentId).orElse(null);

        if(student != null) {
            Parent parent = student.getParent();
            return modelMapper.map(parent, ParentDTO.class);
        }
        return null;

    }

    @Override
    public List<StudentDTO> getOnlyStudents() {
        List<Student> getAllStudents =  studentRepo.findAll();

        if (getAllStudents.size()>0) {
            List<StudentDTO> studentDTOList = new ArrayList<>();

            for (Student student:getAllStudents) {
                StudentDTO studentDTO = new StudentDTO(
                        student.getStudentId(),
                        student.getStudentName(),
                        student.getStudentEmail(),
                        student.getUser().getUserId()
                );
                studentDTOList.add(studentDTO);
            }
            return studentDTOList;

        } else {
            throw new RuntimeException("No Student found");
        }
    }

    @Override
    public StudentDTO getOnlyStudentById(String studentId) {
        Student student = studentRepo.findById(studentId).orElse(null);

        if (student != null) {
            StudentDTO studentDTO = new StudentDTO(
                    student.getStudentId(),
                    student.getStudentName(),
                    student.getStudentEmail(),
                    student.getUser().getUserId()
            );
            return studentDTO;
        } else {
            throw new RuntimeException("No Student found");
        }
    }

    @Override
    public List<String> getAllStudentIds() {
        return studentRepo.findAllStudentIds();
    }

    @Override
    public Page<Student> searchStudents(String searchTerm, Pageable pageable) {
        return studentRepo.findByStudentIdContainingOrStudentNameContaining(
                searchTerm, searchTerm, pageable);
    }

}
