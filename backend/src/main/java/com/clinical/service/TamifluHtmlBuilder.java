package com.clinical.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Component;

@Component
public class TamifluHtmlBuilder {

    public String build(JsonNode d) {
        return """
    <html>
    <head>
      <style>
        body { font-family: Arial; font-size: 11px; margin: 20mm; }
        .section { border: 1px solid #000; padding: 6px; margin-bottom: 8px; }
      </style>
    </head>
    <body>

    <h2 style="text-align:center">
      Oseltamivir Pharmacy Assessment and Prescription
    </h2>

    <div class="section">
      <b>Patient</b><br/>
      Name: %s %s<br/>
      Gender: %s
    </div>

    <div class="section">
      <b>Symptoms</b><br/>
      Fever: %s<br/>
      Cough: %s<br/>
      Headache: %s
    </div>

    <div class="section">
      <b>Care Plan</b><br/>
      Rx Issued: %s
    </div>

    </body>
    </html>
    """.formatted(
                d.at("/patient/firstName").asText(""),
                d.at("/patient/lastName").asText(""),
                d.at("/patient/gender").asText(""),
                box(d.at("/symptoms/fever").asBoolean(false)),
                box(d.at("/symptoms/cough").asBoolean(false)),
                box(d.at("/symptoms/headache").asBoolean(false)),
                box(d.at("/carePlan/rxIssued").asBoolean(false))
        );
    }

    private String box(boolean v) {
        return v ? "☑" : "☐";
    }
}

