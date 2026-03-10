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
            case "DERMATITIS" ->
                    "assessments/fragments/ailments/dermatitis :: section";
            case "DYSMENORRHEA" ->
                    "assessments/fragments/ailments/dysmenorrhea :: section";
            case "INSECT_BITES" ->
                    "assessments/fragments/ailments/insect-bites :: section";
            case "CONJUNCTIVITIS" ->
                    "assessments/fragments/ailments/conjunctivitis :: section";
            case "HEMORRHOIDS" ->
                    "assessments/fragments/ailments/impetigo :: section";
            case "TICK_BITES" ->
                    "assessments/fragments/ailments/tickbites :: section";
            case "ALLERGIC_RHINITIS" ->
                    "assessments/fragments/ailments/allergic_rhinitis :: section";
            case "COLD_SORE" ->
                    "assessments/fragments/ailments/cold_sore :: section";
            case "GERD" ->
                    "assessments/fragments/ailments/gerd :: section";
            case "MUSCULOSKELETAL_SPRAINS" ->
                    "assessments/fragments/ailments/musculoskeletal_sprains :: section";
            case "CANDIDAL_STOMATITIS" ->
                    "assessments/fragments/ailments/candidal_stomatits :: section";
            case "ACNE" ->
                    "assessments/fragments/ailments/acne :: section";
            case "APHTHOUS_ULCERS" ->
                    "assessments/fragments/ailments/aphthous_ulcers :: section";
            case "NAUSEA_VOMITING_PREGNANCY" ->
                    "assessments/fragments/ailments/nausea_vomiting_pregnancy :: section";
            case "PINWORMS" ->
                    "assessments/fragments/ailments/pinworms :: section";
            case "VAGINAL_CANDIDIASIS" ->
                    "assessments/fragments/ailments/vaginal_candidiasis :: section";
            case "DIAPER_DERMATITIS" ->
                    "assessments/fragments/ailments/diaper_dermatitis :: section";

            default ->
                    "assessments/fragments/ailments/default :: section";
        };
    }

}
