package com.example.InstaLearn.mailManagement.controller;

import com.example.InstaLearn.mailManagement.dto.MailDetailsDTO;
import com.example.InstaLearn.mailManagement.service.MailService;
import com.example.InstaLearn.userManagement.util.StandardResponse;
import com.google.zxing.WriterException;
import jakarta.mail.MessagingException;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("api/v1/mail")
@CrossOrigin
public class MailController {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private MailService mailService;

    @PostMapping("/send-user-credentials/{id}")
    public ResponseEntity<StandardResponse> sendTeacherCredentialsMail(@PathVariable(value="id") int userId,@RequestBody MailDetailsDTO mailDetailsDTO) throws MessagingException, IOException, WriterException {
        String message = mailService.sendTeacherCredentialsMail(userId,mailDetailsDTO);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"success",message),
                HttpStatus.OK
        );
    }

}