package me.dormdesk.api.service;

import me.dormdesk.api.model.ExampleUsersData;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.repository.ExampleUserRepo;
import me.dormdesk.api.repository.UserRepo;
import me.dormdesk.api.utils.ApiException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExampleDataService {

    ExampleUserRepo exampleUserRepo;
    ExampleReportService exampleReportService;
    UserRepo userRepo;

    public ExampleDataService(ExampleUserRepo exampleUserRepo, ExampleReportService exampleReportService, UserRepo userRepo) {
        this.exampleUserRepo = exampleUserRepo;
        this.exampleReportService = exampleReportService;
        this.userRepo = userRepo;
    }

    public List<ExampleUsersData> getAllExampleUsers(UserData user) {
        if (user == null) {
            throw ApiException.unauthorized("You can't make this type of requests without loging in properly");
        }
        return exampleUserRepo.findByUserId(user.getId());
    }

    public ExampleUsersData addExampleUser(UserData user) {
//        Optional<UserData> user = userRepo.findByUsername(username);
//        if (user.isEmpty()) {
//            throw new RuntimeException("User not found");
//        }

        if (user == null) {
            throw ApiException.unauthorized("You can't make this type of requests without loging in properly");
        }

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
        if (user == null) {
            throw ApiException.unauthorized("You can't make this type of requests without loging in properly");
        }
        if (exampleUsersData.getUser().getId() != user.getId()) throw new RuntimeException("Requesting user is different than the owner");

        exampleReportService.getAllReports(user).stream()
                        .filter(report -> report.getExampleUserData().getId() == exampleUsersData.getId())
                        .forEach(report -> exampleReportService.deleteExampleReport(report, user));

        exampleUserRepo.deleteById(exampleUsersData.getId());
    }

}
