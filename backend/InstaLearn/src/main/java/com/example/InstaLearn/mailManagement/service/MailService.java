package com.example.InstaLearn.mailManagement.service;

import com.example.InstaLearn.mailManagement.dto.MailDetailsDTO;

public interface MailService {

    String sendTeacherCredentialsMail(String teacherId, MailDetailsDTO mailDetailsDTO);
}
