package com.clinical.controller;

import com.clinical.model.FollowupResponse;
import com.clinical.service.FollowupService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/followups")
@RequiredArgsConstructor
public class FollowupController {

    private final FollowupService followupService;

    @GetMapping
    public List<FollowupResponse> getOverdueFollowups() {
        return followupService.getOverdueFollowups();
    }
}

