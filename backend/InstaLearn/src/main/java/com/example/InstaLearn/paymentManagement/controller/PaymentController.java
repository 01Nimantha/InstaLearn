package com.example.InstaLearn.paymentManagement.controller;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/v1/payment")
@CrossOrigin("http://localhost:5173")
public class PaymentController {


    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, Object>> createCheckoutSession() {
        Map<String, Object> result = new HashMap<>();
        try {
            SessionCreateParams params = SessionCreateParams.builder()
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("http://localhost:8085/api/v1/payment/success")
                    .setCancelUrl("http://localhost:8085/api/v1/payment/cancel")
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("lkr")
                                                    .setUnitAmount(60000L)
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName("Class Fees")
                                                                    .build()
                                                    )
                                                    .build()
                                    ).setQuantity(1L)
                                    .build()
                    )
                    .build();
            System.out.println("Session Params: " + params.toString());

            Session session = Session.create(params);
            result.put("sessionId", session.getId());
            return ResponseEntity.ok(result);

        }catch (Exception e) {
            e.printStackTrace(); // Add this line for detailed logs
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
}
