package me.dormdesk.api.service;

import me.dormdesk.api.Controller.ExampleReportController;
import me.dormdesk.api.model.ExampleReportData;
import me.dormdesk.api.model.ExampleUsersData;
import me.dormdesk.api.model.FormData;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.repository.ExampleReportRepo;
import me.dormdesk.api.repository.ExampleUserRepo;
import me.dormdesk.api.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

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

    public List<ExampleReportData> getAllReports(UserData user) {
        if (user == null) {
            //Need to make and error/exception that user is empty
            return null;
        }

        List<ExampleUsersData> exampleUsersData = exampleUserRepo.findByUserId(user.getId());
        List<ExampleReportData> exampleReports = new ArrayList<>();
        for (ExampleUsersData exampleUser : exampleUsersData) {
            exampleReports.addAll(repo.findByExampleUserData(exampleUser));
        }

        return exampleReports;
    }

    public ExampleReportData addExampleReport(UserData user) {
        if (user == null) {
            //Need to make and error/exception that user is empty
            return null;
        }

        List<ExampleUsersData> exampleUsersData = exampleUserRepo.findByUserId(user.getId());
        if (exampleUsersData.isEmpty()) throw new RuntimeException("There are no example users that can be linked to generation.");
        Random random = new Random();
        ExampleUsersData exampleUser = exampleUsersData.get(random.nextInt(exampleUsersData.size()));

        ExampleReportData exampleReport = ExampleReportData.generateRandomSampleReport(exampleUser);
        repo.save(exampleReport);

        return exampleReport;
    }

    public void deleteExampleReport(ExampleReportData exampleReportData, UserData user) {
        if (exampleReportData.getExampleUserData().getUser().getId() == user.getId()) {
            //Need to make and error/exception that user is trying to delete someone's else user
            return;
        }
        repo.deleteById(exampleReportData.getId());
    }

    public void updateExampleReport(ExampleReportData exampleReportData, UserData user) {
        if (exampleReportData.getExampleUserData().getUser().getId() != user.getId()) {
            //Need to make and error/exception that user is trying to delete someone's else user
            return;
        }

        repo.save(exampleReportData);
    }
}
