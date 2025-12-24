package com.clinical.userManagement.controller;

import com.clinical.userManagement.dto.CheckoutResponse;
import com.clinical.userManagement.dto.CreateCheckoutRequest;
import com.clinical.userManagement.service.BillingService;
import com.clinical.userManagement.service.StripeWebhookService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/billing")
@RequiredArgsConstructor
public class BillingController {

    private final BillingService billingService;
    private final StripeWebhookService stripeWebhookService;


    @PostMapping("/create-checkout-session")
    public CheckoutResponse createCheckout(@RequestBody CreateCheckoutRequest request,
                                           Authentication auth) {
        return billingService.createCheckout(request, auth);
    }

    @PostMapping("/webhook")
    public ResponseEntity<Void> webhook(HttpServletRequest request) {
        stripeWebhookService.handleWebhook(request);
        return ResponseEntity.ok().build();
    }
}
