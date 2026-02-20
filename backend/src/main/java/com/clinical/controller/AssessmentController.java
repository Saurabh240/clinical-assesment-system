package com.clinical.controller;

import com.clinical.dto.*;
import com.clinical.model.Assessment;
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
    public ResponseEntity<Map<String, Long>> create(@RequestBody AssessmentRequest req) {
        return ResponseEntity.ok(Map.of("id", service.createAssessment(req)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssessmentResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAssessment(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(
            @PathVariable Long id,
            @RequestBody AssessmentRequest req) {

        service.updateAssessment(id, req);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/pdf")
    public Map<String, String> generatePdf(@PathVariable Long id) {
        Assessment a = repo.findById(id).orElseThrow();
        Map<String, Object> model = mapper.convertValue(a.getAssessmentData(),
                new TypeReference<>() {
                });
//        String html = htmlBuilder.renderTamiflu(model);
        String html = htmlBuilder.renderAssessment(a);
        byte[] pdf = pdfClient.generate(html);
        String url = s3.upload(pdf, "tamiflu-" + id + ".pdf");
        a.setPdfUrl(url);
        repo.save(a);
        return Map.of("url", url);
    }

    @PostMapping("/getAllAssessments")
    public ResponseEntity<Page<AssessmentSummaryResponse>> getAssessments(
            AssessmentFilterRequest request) {

        return ResponseEntity.ok(service.getAssessments(request));
    }
}

