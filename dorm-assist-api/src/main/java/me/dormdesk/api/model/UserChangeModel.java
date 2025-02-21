package me.dormdesk.api.model;

public class UserChangeModel {

//    private final String username;
    private final String password;
    private final String dataToChange;

    public UserChangeModel(String password, String dataToChange) {
        this.password = password;
        this.dataToChange = dataToChange;
    }


    public String getPassword() {
        return password;
    }

    public String getNewData() {
        return dataToChange;
    }
}
