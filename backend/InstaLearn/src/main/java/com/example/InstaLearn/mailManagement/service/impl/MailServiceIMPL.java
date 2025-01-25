package com.example.InstaLearn.mailManagement.service.impl;

import com.example.InstaLearn.attendanceManagement.qrgenerator.QRGeneratorService;
import com.example.InstaLearn.mailManagement.dto.MailDetailsDTO;
import com.example.InstaLearn.mailManagement.service.MailService;
import com.example.InstaLearn.userManagement.entity.Teacher;
import com.example.InstaLearn.userManagement.entity.User;
import com.example.InstaLearn.userManagement.entity.enums.Role;
import com.example.InstaLearn.userManagement.repo.*;
import com.google.zxing.WriterException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;

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
    @Autowired
    private QRGeneratorService qrGeneratorService;

    @Override
    public String sendTeacherCredentialsMail(int userId, MailDetailsDTO mailDetailsDTO) throws IOException, WriterException, MessagingException {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        String name = null;
        byte[] qrCodeImage = null;
        if (Role.valueOf("ADMIN").equals(user.getRole())) {
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
            String studentId = studentRepo.findById(user.getUserName()).get().getStudentId();
            // Generate QR code
            qrCodeImage = qrGeneratorService.generateQRCode(studentId, 300, 300);

        }
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(mailDetailsDTO.getToMail());
        helper.setFrom("instalearn17@gmail.com");
        helper.setSubject("Welcome to InstaLearn");
        String customizedMessage = "Dear, " + name + "\nYour InstaLearn account credentials are below:\n\nUser Name:" + user.getUserName()
                + " \nPassword:" + "\n\nThank you-InstaLearn";
        helper.setText(customizedMessage);

        // Attach QR code for students only
        if (Role.valueOf("STUDENT").equals(user.getRole()) && qrCodeImage != null) {
            ByteArrayDataSource dataSource = new ByteArrayDataSource(qrCodeImage, "image/jpeg");
            helper.addAttachment("student-qr.png", dataSource);
        }

        javaMailSender.send(message);

        return "Email sent";
    }
}
