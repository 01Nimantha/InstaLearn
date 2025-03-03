package com.example.InstaLearn.paymentManagement.service.impl;

import com.example.InstaLearn.paymentManagement.entity.PaymentRecord;
import com.example.InstaLearn.paymentManagement.repo.PaymentRecordRepository;
import com.example.InstaLearn.paymentManagement.service.PaymentRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentRecordServiceImpl implements PaymentRecordService {

    @Autowired
    private PaymentRecordRepository paymentRecordRepository;

    @Override
    public PaymentRecord savePaymentRecord(PaymentRecord paymentRecord) {
        return paymentRecordRepository.save(paymentRecord);
    }

    @Override
    public PaymentRecord getPaymentRecord(String studentId, String month, String classType) {
        return paymentRecordRepository.findByStudentIdAndMonthAndClassType(studentId, month, classType);
    }

    @Override
    public List<PaymentRecord> getAllPayments() {
        return paymentRecordRepository.findAll();
    }

    @Override
    public void updatePaymentStatus(Long id, String status) {
        Optional<PaymentRecord> record = paymentRecordRepository.findById(id);
        if (record.isPresent()) {
            PaymentRecord payment = record.get();
            payment.setStatus(status);
            paymentRecordRepository.save(payment);
        }
    }
}

