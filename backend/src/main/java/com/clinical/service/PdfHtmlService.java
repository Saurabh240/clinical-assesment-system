package com.clinical.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class PdfHtmlService {

    private final TemplateEngine templateEngine;

    public PdfHtmlService(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    public String renderTamiflu(JsonNode data) {

        Context context = new Context();

        context.setVariable("patient", data.get("patient"));
        context.setVariable("symptoms", data.get("symptoms"));
        context.setVariable("carePlan", data.get("carePlan"));

        return templateEngine.process("pdf/tamiflu", context);
    }
}
