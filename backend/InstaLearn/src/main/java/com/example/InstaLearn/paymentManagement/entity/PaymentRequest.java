package com.example.InstaLearn.paymentManagement.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequest {
    private long amount;
    private String productName;
    private String studentId;
    private String studentName;
}
  