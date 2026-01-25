package com.clinical.service;

import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class S3Service {

    public String upload(byte[] pdf, String name) {
        Path path = Paths.get("pdfs/" + name);
        try {
            Files.createDirectories(path.getParent());
            Files.write(path, pdf);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return "http://localhost:8082/pdfs/" + name;
    }
}
