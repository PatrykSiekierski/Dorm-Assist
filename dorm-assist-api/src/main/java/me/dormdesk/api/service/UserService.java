package me.dormdesk.api.service;

import me.dormdesk.api.model.UserData;
import me.dormdesk.api.repository.UserRepo;
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

    public void createUser(UserData newUser) {
        repo.save(newUser);
    }
}
