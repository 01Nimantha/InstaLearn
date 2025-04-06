package com.example.InstaLearn.paymentManagement.service;

import com.example.InstaLearn.paymentManagement.entity.PaymentRecord;

import java.util.List;

public interface PaymentRecordService {
    PaymentRecord savePaymentRecord(PaymentRecord paymentRecord);
    PaymentRecord getPaymentRecord(String studentId, String month, String classType);
    List<PaymentRecord> getAllPayments();
    void updatePaymentStatus(Long id, String status);
}

