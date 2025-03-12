package me.dormdesk.api.service;

import me.dormdesk.api.Controller.ExampleReportController;
import me.dormdesk.api.model.ExampleReportData;
import me.dormdesk.api.model.ExampleUsersData;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.repository.ExampleReportRepo;
import me.dormdesk.api.repository.ExampleUserRepo;
import me.dormdesk.api.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ExampleReportService {

    UserRepo userRepo;
    ExampleUserRepo exampleUserRepo;
    ExampleReportRepo repo;

    public ExampleReportService(UserRepo userRepo, ExampleUserRepo exampleUserRepo, ExampleReportRepo repo) {
        this.userRepo = userRepo;
        this.exampleUserRepo = exampleUserRepo;
        this.repo = repo;
    }

    public List<ExampleReportData> getAllReports(String username) {
        Optional<UserData> user = userRepo.findByUsername(username);
        if (user.isEmpty()) {
            return null;
        }

        List<ExampleUsersData> exampleUsersData = exampleUserRepo.findByUserId(user.get().getId());
        List<ExampleReportData> exampleReports = new ArrayList<>();
        for (ExampleUsersData exampleUser : exampleUsersData) {
            exampleReports.addAll(repo.findByExampleUserData(exampleUser));
        }

        System.out.println("--------- Example reports: " + exampleReports);
        return exampleReports;
    }

    public ExampleReportData addExampleReport(ExampleUsersData exampleUsersData) {
        return ExampleReportData.generateRandomSampleReport(exampleUsersData);
    }

    public void deleteExampleReport(ExampleReportData exampleReportData) {
        repo.deleteById(exampleReportData.getId());
    }
}
