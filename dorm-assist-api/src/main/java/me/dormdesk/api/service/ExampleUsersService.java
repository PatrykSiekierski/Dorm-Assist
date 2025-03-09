package me.dormdesk.api.service;

import me.dormdesk.api.model.ExampleUsersData;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.repository.ExampleUserRepo;
import me.dormdesk.api.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExampleUsersService {

    ExampleUserRepo exampleUserRepo;
    UserRepo userRepo;

    public ExampleUsersService(ExampleUserRepo exampleUserRepo, UserRepo userRepo) {
        this.exampleUserRepo = exampleUserRepo;
        this.userRepo = userRepo;
    }

    public List<ExampleUsersData> getAllExampleUsers(String username) {
        Optional<UserData> user = userRepo.findByUsername(username);
        if (user.isEmpty()) {
            return null;
        }
        return exampleUserRepo.findByUserId(user.get().getId());
    }

    public ExampleUsersData addExampleUser(String username) {
        Optional<UserData> user = userRepo.findByUsername(username);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        ExampleUsersData exampleUser = ExampleUsersData.generateExampleUserData(user.get());

        System.out.println("User: " + user);
        return exampleUserRepo.save(exampleUser);
    }

    public void deleteExampleUser(int exampleUserId) {
        exampleUserRepo.deleteById(exampleUserId);
    }
}
