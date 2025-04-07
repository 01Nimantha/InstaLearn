package com.example.InstaLearn.paymentManagement.repo;

import com.example.InstaLearn.paymentManagement.entity.PaymentRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRecordRepository extends JpaRepository<PaymentRecord, Long> {
    PaymentRecord findByStudentIdAndMonthAndClassType(String studentId, String month, String classType);
    List<PaymentRecord> findByStudentId(String studentId);
}

