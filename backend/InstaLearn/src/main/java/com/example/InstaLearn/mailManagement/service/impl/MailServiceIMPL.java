package com.example.InstaLearn.mailManagement.service.impl;

import com.example.InstaLearn.mailManagement.dto.MailDetailsDTO;
import com.example.InstaLearn.mailManagement.service.MailService;
import com.example.InstaLearn.userManagement.entity.Teacher;
import com.example.InstaLearn.userManagement.repo.TeacherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailServiceIMPL implements MailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private TeacherRepo teacherRepo;

    public String sendTeacherCredentialsMail(String teacherId, MailDetailsDTO mailDetailsDTO) {

            Teacher teacher = teacherRepo.findById(teacherId).orElseThrow(() -> new RuntimeException("Teacher not found with ID: " + teacherId));

            SimpleMailMessage message = new SimpleMailMessage();

            message.setTo(mailDetailsDTO.getToMail());
            message.setFrom("instalearn17@gmail.com");
            message.setSubject("Welcome to InstaLearn");
            String customizedMessage = "Dear, "+teacher.getTeacherName()+"\nYour InstaLearn account credentials are below:\n\nUser Name:" + teacher.getTeacherId()
                                                                  +" \nPassword:" +"\n\nThank you-InstaLearn";
            message.setText(customizedMessage);
            javaMailSender.send(message);

        return "Email sent";

    }
}
