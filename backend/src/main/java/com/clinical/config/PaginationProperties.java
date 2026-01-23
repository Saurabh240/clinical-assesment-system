package com.clinical.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "app.pagination")
public class PaginationProperties {

    private int defaultPage;
    private int defaultSize;
    private int maxSize;
}
