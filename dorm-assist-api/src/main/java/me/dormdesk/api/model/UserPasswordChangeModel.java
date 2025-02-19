package me.dormdesk.api.model;

public class UserPasswordChangeModel {

    private final String username;
    private final String oldPassword;
    private final String newPassword;

    public UserPasswordChangeModel(String username, String oldPassword, String newPassword) {
        this.username = username;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }

    public String getUsername() {
        return username;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }
}
