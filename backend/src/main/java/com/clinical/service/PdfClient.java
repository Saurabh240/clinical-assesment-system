package com.clinical.service;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Component
public class PdfClient {

    private final WebClient client = WebClient.create("http://host.docker.internal:3001");;

    public byte[] generate(String html) {
        return client.post()
                .uri("/generate-pdf")
                .bodyValue(Map.of("html", html))
                .retrieve()
                .bodyToMono(byte[].class)
                .block();
    }
}
