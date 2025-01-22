package com.example.InstaLearn.mailManagement.service;

import com.example.InstaLearn.mailManagement.dto.MailDetailsDTO;

public interface MailService {

    String sendTeacherCredentialsMail(int userId, MailDetailsDTO mailDetailsDTO);
}
