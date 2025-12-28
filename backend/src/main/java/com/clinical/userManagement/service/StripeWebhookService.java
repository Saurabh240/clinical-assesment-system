package com.clinical.userManagement.service;

import com.clinical.userManagement.model.Pharmacy;
import com.clinical.userManagement.model.Subscription;
import com.clinical.userManagement.model.SubscriptionPlan;
import com.clinical.userManagement.model.SubscriptionStatus;
import com.clinical.userManagement.repository.PharmacyRepository;
import com.clinical.userManagement.repository.SubscriptionRepository;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class StripeWebhookService {

    private final PharmacyRepository pharmacyRepo;
    private final SubscriptionRepository subscriptionRepo;

    @Value("${stripe.webhook.secret}")
    private String webhookSecret;

    public void handleWebhook(HttpServletRequest request) {

        String payload;
        try {
            payload = request.getReader().lines().collect(Collectors.joining());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        Event event;
        try {
            event = Webhook.constructEvent(
                    payload,
                    request.getHeader("Stripe-Signature"),
                    webhookSecret
            );
        } catch (Exception e) {
            throw new RuntimeException("Invalid Stripe signature");
        }

        if ("checkout.session.completed".equals(event.getType())) {

            Session session = (Session) event.getDataObjectDeserializer()
                    .getObject().orElseThrow();

            Pharmacy pharmacy = pharmacyRepo
                    .findByStripeCustomerId(session.getCustomer())
                    .orElseThrow();

            Subscription sub = subscriptionRepo
                    .findByPharmacy(pharmacy)
                    .orElse(new Subscription());

            sub.setPharmacy(pharmacy);
            sub.setPlan(SubscriptionPlan.MONTHLY);
            sub.setStatus(SubscriptionStatus.ACTIVE);
            sub.setStartDate(Instant.now());
            sub.setEndDate(Instant.now().plusSeconds(30L * 24 * 60 * 60)); // 30 days

            subscriptionRepo.save(sub);
        }
    }
}
