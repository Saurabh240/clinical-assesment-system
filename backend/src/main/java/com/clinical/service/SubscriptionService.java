package com.clinical.service;

import com.clinical.dto.AuthUser;
import com.clinical.dto.TrialResponse;
import com.clinical.model.Subscription;
import com.clinical.model.SubscriptionPlan;
import com.clinical.model.SubscriptionStatus;
import com.clinical.model.User;
import com.clinical.repository.SubscriptionRepository;
import com.clinical.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
@Transactional
public class SubscriptionService {

    private final UserRepository userRepository;
    private final SubscriptionRepository subscriptionRepo;

    public TrialResponse startTrial(Authentication auth) {

        AuthUser authUser = (AuthUser) auth.getPrincipal();
        User user = userRepository
                .findByEmail(authUser.email())
                .orElseThrow();

        if (user.getPharmacy() == null) {
            throw new IllegalStateException("User not linked to pharmacy");
        }

        if (subscriptionRepo.existsByPharmacy(user.getPharmacy())) {
            throw new IllegalStateException("Subscription already exists");
        }

        Subscription sub = new Subscription();
        sub.setPharmacy(user.getPharmacy());
        sub.setPlan(SubscriptionPlan.TRIAL);
        sub.setStatus(SubscriptionStatus.ACTIVE);
        sub.setStartDate(Instant.now());
        sub.setEndDate(Instant.now().plusSeconds(15L * 24 * 60 * 60)); // 15 days trial

        subscriptionRepo.save(sub);

        return new TrialResponse(
                SubscriptionPlan.TRIAL,
                sub.getEndDate(),
                "/dashboard"
        );
    }
}
