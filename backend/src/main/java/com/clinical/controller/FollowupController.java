package com.clinical.controller;

import com.clinical.dto.FollowUpRequest;
import com.clinical.dto.FollowupResponse;
import com.clinical.dto.FollowupUpdateResponse;
import com.clinical.service.FollowupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class FollowupController {

    private final FollowupService followupService;

    @GetMapping("/followups")
    public List<FollowupResponse> getOverdueFollowups() {
        return followupService.getOverdueFollowups();
    }

    @PostMapping("/assessments/{assessmentId}/followup")
    public ResponseEntity<FollowupUpdateResponse> addOrUpdateFollowup(
            @PathVariable Long assessmentId,
            @Valid @RequestBody FollowUpRequest request,
            Principal principal
    ) {
        FollowupUpdateResponse response =
                followupService.addOrUpdateFollowup(
                        assessmentId,
                        request,
                        principal.getName()
                );

        return ResponseEntity.ok(response);
    }
}
