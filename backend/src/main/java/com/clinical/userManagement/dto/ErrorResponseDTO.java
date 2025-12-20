package com.clinical.userManagement.dto;

import java.time.LocalDateTime;

public record ErrorResponseDTO(LocalDateTime timeStamp, int status, String error, String message, String path) {
}
