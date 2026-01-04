package com.clinical.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Locale;
import java.util.Map;

@Service
public class PdfHtmlService {

    private final TemplateEngine templateEngine;
    private final ObjectMapper objectMapper;

    public PdfHtmlService(TemplateEngine templateEngine, ObjectMapper objectMapper) {
        this.templateEngine = templateEngine;
        this.objectMapper = objectMapper;
    }

    public String renderTamiflu(JsonNode data) {

        Map<String, Object> model =
                objectMapper.convertValue(
                        data,
                        new TypeReference<>() {
                        }
                );
        Context context = new Context(Locale.ENGLISH);

        context.setVariable("patient", model.get("patient"));
        context.setVariable("symptoms", model.get("symptoms"));
        context.setVariable("prescriber", model.get("prescriber"));
        context.setVariable("eligibility", model.get("eligibility"));
        context.setVariable("carePlan", model.get("carePlan"));
        context.setVariable("consent", model.get("consent"));
        context.setVariable("assessment", model.get("assessment"));
        context.setVariable("medication", model.get("medication"));
        context.setVariable("signature", model.get("signature"));
        context.setVariable("followUp", model.get("followUp"));

        return templateEngine.process("pdf/tamiflu", context);
    }
}
