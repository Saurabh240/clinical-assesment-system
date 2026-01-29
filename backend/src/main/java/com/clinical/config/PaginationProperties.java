package com.clinical.config;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "app.pagination")
public class PaginationProperties {

    private int defaultPage;
    private int defaultSize;
    private int maxSize;
}
