package me.dormdesk.api.utils;

import lombok.Getter;

import java.time.Instant;

@Getter
public class ApiErrorResponse {

    private final int status;
    private final String error;
    private final String message;
    private final Instant timestamp;

    private ApiErrorResponse(int status, String error, String message) {
        this.status = status;
        this.error = error;
        this.message = message;
        this.timestamp = Instant.now();
    }

    public static ApiErrorResponse from(ApiException ex) {
        return new ApiErrorResponse(
                ex.getStatus().value(),
                ex.getStatus().getReasonPhrase(),
                ex.getMessage()
        );
    }

    public static ApiErrorResponse internal() {
        return new ApiErrorResponse(
                500,
                "Internal Server Error",
                "Unexpected error occurred"
        );
    }
}
