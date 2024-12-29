package me.dormdesk.api.service;

import me.dormdesk.api.model.UserData;
import me.dormdesk.api.repository.UserRepo;
import me.dormdesk.api.util.RegistrationResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    UserRepo repo;

    public UserService(UserRepo repo) {
        this.repo = repo;
    }

    public List<UserData> getUsers() {
        return repo.findAll();
    }

    public RegistrationResponse createUser(UserData newUser) {
        List<UserData> allUsers = repo.findAll();
        for (UserData userData : allUsers) {
            if (userData.getEmail().equals(newUser.getEmail())) {
                return new RegistrationResponse("error", "This email already exist");
            }

            if (userData.getUsername().equals(newUser.getUsername())) {
                return new RegistrationResponse("error", "This username already exist");
            }
        }

        repo.save(newUser);
        return new RegistrationResponse("success", "The new account have been created successfully");
    }
}
