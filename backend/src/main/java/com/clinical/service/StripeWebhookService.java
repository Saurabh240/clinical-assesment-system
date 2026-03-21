package com.clinical.service;

import com.clinical.model.Pharmacy;
import com.clinical.model.Subscription;
import com.clinical.model.SubscriptionPlan;
import com.clinical.model.SubscriptionStatus;
import com.clinical.repository.PharmacyRepository;
import com.clinical.repository.SubscriptionRepository;
import com.stripe.exception.StripeException;
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

    public void handleWebhook(HttpServletRequest request) throws StripeException {

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

            // Fetch real subscription data from Stripe
            com.stripe.model.Subscription stripeSub =
                    com.stripe.model.Subscription.retrieve(session.getSubscription());

            String interval = stripeSub.getItems().getData().get(0)
                    .getPrice().getRecurring().getInterval(); // "month" or "year"

            SubscriptionPlan plan = "year".equals(interval)
                    ? SubscriptionPlan.ANNUAL
                    : SubscriptionPlan.MONTHLY;

            Instant start = Instant.ofEpochSecond(
                    stripeSub.getCurrentPeriodStart());
            Instant end   = Instant.ofEpochSecond(
                    stripeSub.getCurrentPeriodEnd());

            Pharmacy pharmacy = pharmacyRepo
                    .findByStripeCustomerId(session.getCustomer())
                    .orElseThrow();

            Subscription sub = subscriptionRepo
                    .findByPharmacy(pharmacy).orElse(new Subscription());

            sub.setPharmacy(pharmacy);
            sub.setPlan(plan);
            sub.setStatus(SubscriptionStatus.ACTIVE);
            sub.setStartDate(start);
            sub.setEndDate(end);
            sub.setStripeSubscriptionId(stripeSub.getId());
            subscriptionRepo.save(sub);
        }
    }
}
