package com.clinical.service;

import com.clinical.model.Assessment;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Locale;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PdfHtmlService {

    private final TemplateEngine templateEngine;
    private final ObjectMapper objectMapper;

    public String renderTamiflu(Map<String, Object> data) {
        Context context = new Context(Locale.ENGLISH);
        context.setVariables(data);
        return templateEngine.process("tamiflu", context);
    }

    public String renderAssessment(Assessment assessment) {

        Map<String, Object> model =
                objectMapper.convertValue(
                        assessment.getAssessmentData(),
                        new TypeReference<>() {});

        Context context = new Context(Locale.ENGLISH);
        context.setVariable("data", model);

        return templateEngine.process(
                "assessments/base-assessment",
                context
        );
    }

    public String resolveAilmentFragment(String ailmentCode) {

        return switch (ailmentCode) {

            case "UTI" ->
                    "assessments/fragments/ailments/uti :: section";

            case "OSELTAMIVIR" ->
                    "assessments/fragments/ailments/tamiflu :: section";

            default ->
                    "assessments/fragments/ailments/default :: section";
        };
    }

}
