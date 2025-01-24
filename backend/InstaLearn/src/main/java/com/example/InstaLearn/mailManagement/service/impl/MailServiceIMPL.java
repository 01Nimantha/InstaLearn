package com.example.InstaLearn.mailManagement.service.impl;

import com.example.InstaLearn.mailManagement.dto.MailDetailsDTO;
import com.example.InstaLearn.mailManagement.service.MailService;
import com.example.InstaLearn.userManagement.entity.Teacher;
import com.example.InstaLearn.userManagement.entity.User;
import com.example.InstaLearn.userManagement.entity.enums.Role;
import com.example.InstaLearn.userManagement.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailServiceIMPL implements MailService {

    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private AdminRepo adminRepo;
    @Autowired
    private SuperAdminRepo superAdminRepo;
    @Autowired
    private AOfficerRepo aOfficerRepo;
    @Autowired
    private TeacherRepo teacherRepo;
    @Autowired
    private ParentRepo parentRepo;
    @Autowired
    private StudentRepo studentRepo;

    @Override
    public String sendTeacherCredentialsMail(int userId, MailDetailsDTO mailDetailsDTO) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("Teacher not found with ID: " + userId));

        String name = null;
        if(Role.valueOf("ADMIN").equals(user.getRole())) {
             name = adminRepo.findById(user.getUserName()).get().getAdminName();
        } else if (Role.valueOf("SUPERADMIN").equals(user.getRole())) {
             name = superAdminRepo.findById(user.getUserName()).get().getSadminId();
        } else if (Role.valueOf("AOFFICER").equals(user.getRole())) {
             name = aOfficerRepo.findById(user.getUserName()).get().getAttendanceOfficerName();
        } else if (Role.valueOf("TEACHER").equals(user.getRole())) {
            name = teacherRepo.findById(user.getUserName()).get().getTeacherName();
        } else if (Role.valueOf("PARENT").equals(user.getRole())) {
            name = parentRepo.findById(user.getUserName()).get().getParentName();
        } else if (Role.valueOf("STUDENT").equals(user.getRole())) {
            name = studentRepo.findById(user.getUserName()).get().getStudentName();
        } else{

        }


        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(mailDetailsDTO.getToMail());
        message.setFrom("instalearn17@gmail.com");
        message.setSubject("Welcome to InstaLearn");
        String customizedMessage = "Dear, "+name+"\nYour InstaLearn account credentials are below:\n\nUser Name:" + user.getUserName()
                +" \nPassword:" +"\n\nThank you-InstaLearn";
        message.setText(customizedMessage);
        javaMailSender.send(message);

        return "Email sent";
    }

    //public String sendTeacherCredentialsMail(String teacherId, MailDetailsDTO mailDetailsDTO) {

//        Teacher teacher = teacherRepo.findById(teacherId).orElseThrow(() -> new RuntimeException("Teacher not found with ID: " + teacherId));
//
//        SimpleMailMessage message = new SimpleMailMessage();
//
//        message.setTo(mailDetailsDTO.getToMail());
//        message.setFrom("instalearn17@gmail.com");
//        message.setSubject("Welcome to InstaLearn");
//        String customizedMessage = "Dear, "+teacher.getTeacherName()+"\nYour InstaLearn account credentials are below:\n\nUser Name:" + teacher.getTeacherId()
//                +" \nPassword:" +"\n\nThank you-InstaLearn";
//        message.setText(customizedMessage);
//        javaMailSender.send(message);
//
//        return "Email sent";

    //}
}
