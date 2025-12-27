package com.clinical.service;

import com.clinical.dto.AuthUser;
import com.clinical.dto.CheckoutResponse;
import com.clinical.dto.CreateCheckoutRequest;
import com.clinical.model.Pharmacy;
import com.clinical.model.SubscriptionPlan;
import com.clinical.model.User;
import com.clinical.repository.PharmacyRepository;
import com.clinical.repository.UserRepository;
import com.stripe.model.Customer;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class BillingService {

    private final UserRepository userRepository;
    private final PharmacyRepository pharmacyRepo;

    @Value("${stripe.price.monthly}")
    private String monthlyPriceId;

    @Value("${stripe.price.annual}")
    private String annualPriceId;

    public CheckoutResponse createCheckout(CreateCheckoutRequest request, Authentication auth) {

        AuthUser authUser = (AuthUser) auth.getPrincipal();
        User user = userRepository
                .findByEmail(authUser.email())
                .orElseThrow();
        Pharmacy pharmacy = user.getPharmacy();

        if (pharmacy == null) {
            throw new IllegalStateException("No pharmacy linked");
        }

        try {
            if (pharmacy.getStripeCustomerId() == null) {
                Customer customer = Customer.create(
                        Map.of("email", user.getEmail())
                );
                pharmacy.setStripeCustomerId(customer.getId());
                pharmacyRepo.save(pharmacy);
            }

            String priceId = request.plan() == SubscriptionPlan.ANNUAL
                    ? annualPriceId
                    : monthlyPriceId;

            Session session = Session.create(
                    SessionCreateParams.builder()
                            .setCustomer(pharmacy.getStripeCustomerId())
                            .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                            .addLineItem(
                                    SessionCreateParams.LineItem.builder()
                                            .setPrice(priceId)
                                            .setQuantity(1L)
                                            .build()
                            )
                            .setSuccessUrl("http://localhost:5173/success")
                            .setCancelUrl("http://localhost:5173/cancel")
                            .build()
            );

            return new CheckoutResponse(session.getUrl());

        } catch (Exception e) {
            throw new RuntimeException("Stripe checkout failed", e);
        }
    }
}
