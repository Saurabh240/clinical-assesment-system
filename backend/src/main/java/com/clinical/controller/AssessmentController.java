package com.clinical.controller;

import com.clinical.dto.AssessmentRequest;
import com.clinical.dto.TrialResponse;
import com.clinical.model.Assessment;
import com.clinical.repository.AssessmentRepository;
import com.clinical.service.PdfClient;
import com.clinical.service.S3Service;
import com.clinical.service.SubscriptionService;
import com.clinical.service.TamifluHtmlBuilder;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/assessments")
@RequiredArgsConstructor
public class AssessmentController {

    private final AssessmentRepository repo;
    private final ObjectMapper mapper;
    private final TamifluHtmlBuilder htmlBuilder;
    private final PdfClient pdfClient;
    private final S3Service s3;

    @PostMapping
    public Map<String, Long> create(@RequestBody AssessmentRequest req) {
        Assessment a = new Assessment();
        a.setAilmentCode(req.getAilmentCode());
        a.setAssessmentData(mapper.valueToTree(req.getData()));
        a.setCreatedAt(Instant.now());
        repo.save(a);
        return Map.of("id", a.getId());
    }

    @GetMapping("/{id}")
    public Map<String, Object> get(@PathVariable Long id) {
        Assessment a = repo.findById(id).orElseThrow();
        return Map.of(
                "id", a.getId(),
                "data", a.getAssessmentData(),
                "pdfUrl", a.getPdfUrl()
        );
    }

    @PostMapping("/{id}/pdf")
    public Map<String, String> generatePdf(@PathVariable Long id) {
        Assessment a = repo.findById(id).orElseThrow();
        String html = htmlBuilder.build(a.getAssessmentData());
        byte[] pdf = pdfClient.generate(html);
        String url = s3.upload(pdf, "tamiflu-" + id + ".pdf");
        a.setPdfUrl(url);
        repo.save(a);
        return Map.of("url", url);
    }
}
