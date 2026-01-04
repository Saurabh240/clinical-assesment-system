package com.clinical.service;

import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Locale;
import java.util.Map;

@Service
public class PdfHtmlService {

    private final TemplateEngine templateEngine;

    public PdfHtmlService(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    public String renderTamiflu(Map<String, Object> data) {
        Context context = new Context(Locale.ENGLISH);
        context.setVariables(data);
        return templateEngine.process("pdf/tamiflu", context);
    }
}
