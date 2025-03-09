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

        ExampleUsersData exampleUser;
        do {
            exampleUser = ExampleUsersData.generateExampleUserData(user.get());
        } while (doesExampleUserAlreadyExist(exampleUser.getEmail(), user.get().getId()));

        return exampleUserRepo.save(exampleUser);
    }

    private boolean doesExampleUserAlreadyExist(String exampleUserEmail, int userId) {
        Optional<ExampleUsersData> foundExampleUser = exampleUserRepo.findByEmail(exampleUserEmail);
        if (foundExampleUser.isEmpty()) return false;

        if (foundExampleUser.get().getEmail().equals(exampleUserEmail)) return false;

        return foundExampleUser.get().getUser().getId() == userId;
    }

    public void deleteExampleUser(ExampleUsersData exampleUsersData, String username) {
        Optional<UserData> user = userRepo.findByUsername(username);
        if (user.isEmpty()) {
            throw new RuntimeException("Requesting user not found");
        }
        if (exampleUsersData.getUser().getId() != user.get().getId()) throw new RuntimeException("Requesting user is different than the owner");

        exampleUserRepo.deleteById(exampleUsersData.getId());
    }

}
