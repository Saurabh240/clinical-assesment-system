package com.clinical.controller;

import com.clinical.dto.TrialResponse;
import com.clinical.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @PostMapping("/trial")
    public TrialResponse startTrial(Authentication auth) {
        return subscriptionService.startTrial(auth);
    }
}
