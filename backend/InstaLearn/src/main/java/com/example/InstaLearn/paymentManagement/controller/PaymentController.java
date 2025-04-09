package com.example.InstaLearn.paymentManagement.controller;

import com.example.InstaLearn.paymentManagement.entity.PaymentRecord;
import com.example.InstaLearn.paymentManagement.repo.PaymentRecordRepository;
import com.example.InstaLearn.paymentManagement.service.PaymentRecordService;
import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/payment")
@CrossOrigin("http://localhost:5173")
public class PaymentController {

    @Autowired
    private PaymentRecordService paymentRecordService;

    @Autowired
    private PaymentRecordRepository paymentRecordRepository;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, Object>> createCheckoutSession(@RequestBody Map<String, Object> request) {
        Map<String, Object> result = new HashMap<>();
        try {
            // Extract values from request
//            @RequestBody Map<String, Object> request
            long amount = ((Number) request.get("amount")).longValue(); // Get amount from request
            String productName = (String) request.get("productName");

            SessionCreateParams params = SessionCreateParams.builder()
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("http://localhost:5173/student-dashboard/ST_2025_10001")
                    .setCancelUrl("http://localhost:8085/api/v1/payment/cancel")
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("LKR")  // Use correct currency
                                                    .setUnitAmount(amount)  // Amount from request
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName(productName)
                                                                    .build()
                                                    )
                                                    .build()
                                    ).setQuantity(1L)
                                    .build()
                    )
                    .build();

            Session session = Session.create(params);
            result.put("sessionId", session.getId());
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            result.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(result);
        }
    }

    @GetMapping("/success")
    public String getSuccess() {
        return "Payment success";
    }

    @GetMapping("/cancel")
    public String getCancel() {
        return "Payment canceled";
    }

    @PostMapping("/store-payment-record")
    public ResponseEntity<?> storePaymentRecord(@RequestBody PaymentRecord paymentRecord) {
        paymentRecord.setStatus("Paid"); // Default status before payment
        PaymentRecord savedRecord = paymentRecordService.savePaymentRecord(paymentRecord);
        return ResponseEntity.ok(savedRecord);
    }

    // Get all payment records
    @GetMapping("/all")
    public ResponseEntity<List<PaymentRecord>> getAllPayments() {
        return ResponseEntity.ok(paymentRecordService.getAllPayments());
    }

    // Update payment status (e.g., from "Pending" to "Paid")
    @PutMapping("/update-status/{id}")
    public ResponseEntity<String> updatePaymentStatus(@PathVariable Long id, @RequestParam String status) {
        paymentRecordService.updatePaymentStatus(id, status);
        return ResponseEntity.ok("Payment status updated successfully");
    }

    @GetMapping("/get-payment-record/{studentId}")
    public List<PaymentRecord> getPaymentHistory(@PathVariable String studentId) {
        return paymentRecordRepository.findByStudentId(studentId);
    }
}
