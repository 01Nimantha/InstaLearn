package com.example.InstaLearn.mailManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "email")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Email {
    @Id
    @Column(name = "email_id", updatable = false, nullable = false)
    private int emailId;

    @Column(name="tomail")
    private String toMail;

    @Column(name="frommail")
    private String fromMail;

    @Column(name="message")
    private String message;

    @Column(name="subject")
    private String subject;

}
