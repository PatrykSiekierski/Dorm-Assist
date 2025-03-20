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

    public List<ExampleUsersData> getAllExampleUsers(UserData user) {
        if (user == null) {
            //Need to make and error/exception that user is empty
            return null;
        }
        return exampleUserRepo.findByUserId(user.getId());
    }

    public ExampleUsersData addExampleUser(UserData user) {
//        Optional<UserData> user = userRepo.findByUsername(username);
//        if (user.isEmpty()) {
//            throw new RuntimeException("User not found");
//        }

        if (user == null) {
            System.out.println("User is null");
        }
        System.out.println("User is: " + user);

        ExampleUsersData exampleUser;
        do {
            exampleUser = ExampleUsersData.generateExampleUserData(user);
        } while (doesExampleUserAlreadyExist(exampleUser.getEmail(), user.getId()));

        return exampleUserRepo.save(exampleUser);
    }

    private boolean doesExampleUserAlreadyExist(String exampleUserEmail, int userId) {
        Optional<ExampleUsersData> foundExampleUser = exampleUserRepo.findByEmail(exampleUserEmail);
        if (foundExampleUser.isEmpty()) return false;

        if (foundExampleUser.get().getEmail().equals(exampleUserEmail)) return false;

        return foundExampleUser.get().getUser().getId() == userId;
    }

    public void deleteExampleUser(ExampleUsersData exampleUsersData, UserData user) {
        System.out.println("1");
        if (user == null) {
            //Need to make and error/exception that user is empty
            return;
        }
        System.out.println("2");
        if (exampleUsersData.getUser().getId() != user.getId()) throw new RuntimeException("Requesting user is different than the owner");

        System.out.println("3");
        exampleUserRepo.deleteById(exampleUsersData.getId());
    }

}
