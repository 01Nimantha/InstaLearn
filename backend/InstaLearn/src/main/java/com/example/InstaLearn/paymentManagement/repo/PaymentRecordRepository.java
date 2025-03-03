package com.example.InstaLearn.paymentManagement.repo;

import com.example.InstaLearn.paymentManagement.entity.PaymentRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRecordRepository extends JpaRepository<PaymentRecord, Long> {
    PaymentRecord findByStudentIdAndMonthAndClassType(String studentId, String month, String classType);
}

