package me.dormdesk.api.util;

public class RegistrationResponse {

    private String status;
    private String message;

    public RegistrationResponse() {
    }

    public RegistrationResponse(String status, String message) {
        this.status = status;
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
