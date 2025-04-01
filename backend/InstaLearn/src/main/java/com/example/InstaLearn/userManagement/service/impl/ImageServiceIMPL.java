package com.example.InstaLearn.userManagement.service.impl;

import com.example.InstaLearn.userManagement.entity.*;
import com.example.InstaLearn.userManagement.entity.enums.Role;
import com.example.InstaLearn.userManagement.repo.*;
import com.example.InstaLearn.userManagement.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ImageServiceIMPL implements ImageService {

    @Autowired
    private ImageRepo imageRepo;

    @Autowired
    private AOfficerRepo aOfficerRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private TeacherRepo teacherRepo;

    @Autowired
    private ParentRepo parentRepo;

    @Override
    public String uploadImage(int userId, MultipartFile file) throws IOException {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

//        Image existingImage = null;
//        switch (user.getRole()) {
//            case AOFFICER:
//                existingImage = aOfficerRepo.findById(user.getUserName()).map(AttendanceOfficer::getImage).orElse(null);
//                break;
//            case TEACHER:
//                existingImage = teacherRepo.findById(user.getUserName()).map(Teacher::getImage).orElse(null);
//                break;
//            case PARENT:
//                existingImage = parentRepo.findById(user.getUserName()).map(Parent::getImage).orElse(null);
//                break;
//            case STUDENT:
//                existingImage = studentRepo.findById(user.getUserName()).map(Student::getImage).orElse(null);
//                break;
//            default:
//                throw new RuntimeException("Invalid role: " + user.getRole());
//        }
//
//        if (existingImage != null) {
//            throw new RuntimeException("Image already exists for this user. Please update or delete the existing image first.");
//        }

        Image image = new Image();
        image.setFileName(file.getOriginalFilename());
        image.setFileType(file.getContentType());
        image.setImageData(file.getBytes());
        image.setDownloadUrl("/api/v1/image/get-user-image/" + userId); // Generalized URL

        // Save Image to Database
        Image savedImage = imageRepo.save(image);

        switch (user.getRole()) {
            case AOFFICER:
                AttendanceOfficer officer = aOfficerRepo.findById(user.getUserName())
                        .orElseThrow(() -> new RuntimeException("Attendance Officer not found"));
                officer.setImage(savedImage);
                aOfficerRepo.save(officer);
                break;

            case TEACHER:
                Teacher teacher = teacherRepo.findById(user.getUserName())
                        .orElseThrow(() -> new RuntimeException("Teacher not found"));
                teacher.setImage(savedImage);
                teacherRepo.save(teacher);
                break;

            case PARENT:
                Parent parent = parentRepo.findById(user.getUserName())
                        .orElseThrow(() -> new RuntimeException("Parent not found"));
                parent.setImage(savedImage);
                parentRepo.save(parent);
                break;

            case STUDENT:
                Student student = studentRepo.findById(user.getUserName())
                        .orElseThrow(() -> new RuntimeException("Student not found"));
                student.setImage(savedImage);
                studentRepo.save(student);
                break;

            default:
                throw new RuntimeException("Invalid role: " + user.getRole());
        }

        return savedImage.getDownloadUrl();
    }

    @Override
    public byte[] getImage(Long imageId) {
        return imageRepo.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Image not found"))
                .getImageData();
    }

}
