package com.clinical.controller;

import com.clinical.dto.*;
import com.clinical.service.FollowupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class FollowupController {

    private final FollowupService followupService;

    @GetMapping("/followups")
    public List<FollowupReadResponse> getOverdueFollowups() {
        return followupService.getOverdueFollowups();
    }

    @PostMapping("/assessments/{assessmentId}/followup")
    public ResponseEntity<FollowupUpdateResponse> createFollowup(
            @PathVariable Long assessmentId,
            @Valid @RequestBody FollowUpRequest request,
            Authentication authentication
    ) {
        AuthUser authUser = (AuthUser) authentication.getPrincipal();

        FollowupUpdateResponse response =
                followupService.createFollowup(
                        assessmentId,
                        request,
                        authUser.email()
                );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/assessments/{assessmentId}/followup")
    public ResponseEntity<FollowupResponse> getFollowupByAssessmentId(
            @PathVariable Long assessmentId
    ) {
        FollowupResponse response =
                followupService.getLatestFollowup(assessmentId);

        return ResponseEntity.ok(response);
    }

}
