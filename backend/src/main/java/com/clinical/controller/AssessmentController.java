package com.clinical.controller;

import com.clinical.dto.AssessmentFilterRequest;
import com.clinical.dto.AssessmentRequest;
import com.clinical.model.Assessment;
import com.clinical.model.FollowupStatus;
import com.clinical.repository.AssessmentRepository;
import com.clinical.service.AssessmentService;
import com.clinical.service.PdfClient;
import com.clinical.service.PdfHtmlService;
import com.clinical.service.S3Service;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/assessments")
@RequiredArgsConstructor
public class AssessmentController {

    private final AssessmentRepository repo;
    private final AssessmentService service;
    private final ObjectMapper mapper;
    private final PdfHtmlService htmlBuilder;
    private final PdfClient pdfClient;
    private final S3Service s3;

    @PostMapping
    public Map<String, Long> create(@RequestBody AssessmentRequest req) {
        Assessment a = new Assessment();
        a.setAilmentCode(req.getAilmentCode());
        a.setAssessmentData(mapper.valueToTree(req.getData()));
        a.setCreatedAt(Instant.now());
        a.setFollowupStatus(FollowupStatus.PENDING);
        a.setLastFollowupDate(null);
        repo.save(a);
        return Map.of("id", a.getId());
    }

    @GetMapping("/{id}")
    public Map<String, Object> get(@PathVariable Long id) {
        Assessment a = repo.findById(id).orElseThrow();
        return Map.of(
                "id", a.getId(),
                "data", a.getAssessmentData(),
                "pdfUrl", a.getPdfUrl()!=null ? a.getPdfUrl() : ""
        );
    }

    @PostMapping("/{id}/pdf")
    public Map<String, String> generatePdf(@PathVariable Long id) {
        Assessment a = repo.findById(id).orElseThrow();
        Map<String, Object> model = mapper.convertValue(a.getAssessmentData(),
                new TypeReference<>() {
                });
        String html = htmlBuilder.renderTamiflu(model);
        byte[] pdf = pdfClient.generate(html);
        String url = s3.upload(pdf, "tamiflu-" + id + ".pdf");
        a.setPdfUrl(url);
        repo.save(a);
        return Map.of("url", url);
    }

    @PostMapping("/getAllAssessments")
    public ResponseEntity<Page<Assessment>> getAssessments(@RequestBody
            AssessmentFilterRequest request) {

        return ResponseEntity.ok(
                service.getAssessments(request)
        );
    }
}
