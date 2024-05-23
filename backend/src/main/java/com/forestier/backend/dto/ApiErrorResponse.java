package com.forestier.backend.dto;

public record ApiErrorResponse(
        int errorCode,
        String description
) {
}
