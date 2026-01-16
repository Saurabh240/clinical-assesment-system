package com.clinical.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Component
public class PdfClient {

    private final WebClient client;

    public PdfClient(
            @Value("${pdf.service.url}") String pdfServiceUrl
    ) {
        this.client = WebClient.builder()
                .baseUrl(pdfServiceUrl)
                .build();
    }

    public byte[] generate(String html) {
        return client.post()
                .uri("/generate-pdf")
                .bodyValue(Map.of("html", html))
                .retrieve()
                .bodyToMono(byte[].class)
                .block();
    }
}
