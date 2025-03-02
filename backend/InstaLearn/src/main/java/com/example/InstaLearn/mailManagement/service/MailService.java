package com.example.InstaLearn.mailManagement.service;

import com.example.InstaLearn.mailManagement.dto.MailDetailsDTO;
import com.google.zxing.WriterException;
import jakarta.mail.MessagingException;

import java.io.IOException;

public interface MailService {

    String sendTeacherCredentialsMail(int userId, MailDetailsDTO mailDetailsDTO) throws IOException, WriterException, MessagingException;
}
