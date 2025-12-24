package com.clinical.userManagement.dto;

import com.clinical.userManagement.model.Role;
import com.clinical.userManagement.model.Subscription;
import com.clinical.userManagement.model.User;
import com.clinical.userManagement.model.UserStatus;

public record UserContextResponse(
        Long userId,
        String email,
        Role role,
        UserStatus status,
        PharmacyInfo pharmacy,
        SubscriptionInfo subscription
) {
    public static UserContextResponse from(User user) {

        Subscription sub = user.getPharmacy() != null
                ? user.getPharmacy().getSubscription()
                : null;

        return new UserContextResponse(
                user.getId(),
                user.getEmail(),
                user.getRole(),
                user.getStatus(),
                user.getPharmacy() != null
                        ? new PharmacyInfo(
                        user.getPharmacy().getId(),
                        user.getPharmacy().getName())
                        : null,
                sub != null
                        ? new SubscriptionInfo(
                        sub.getPlan(),
                        sub.getStatus(),
                        sub.getEndDate())
                        : null
        );
    }

}
