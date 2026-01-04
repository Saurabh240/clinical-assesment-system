package com.clinical.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class PdfController {

    @GetMapping("/pdfs/{fileName}")
    public ResponseEntity<byte[]> getPdf(@PathVariable String fileName)
            throws IOException {

        Path path = Paths.get("pdfs", fileName);

        if (!Files.exists(path)) {
            return ResponseEntity.notFound().build();
        }

        byte[] pdf = Files.readAllBytes(path);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "application/pdf")
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + fileName)
                .body(pdf);
    }
}
