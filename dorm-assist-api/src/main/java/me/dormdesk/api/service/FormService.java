package me.dormdesk.api.service;

import jakarta.transaction.Transactional;
import me.dormdesk.api.model.FormData;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.repository.FormRepo;
import me.dormdesk.api.repository.UserRepo;
import me.dormdesk.api.utils.ApiException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormService {

    UserRepo userRepo;
    FormRepo repo;

    public FormService(FormRepo repo, UserRepo userRepo) {
        this.userRepo = userRepo;
        this.repo = repo;
    }

    public void createNewReport(FormData data, UserData user) {
        data.setUser(user);
        repo.save(data);
    }

    @Transactional
    public void updateForms(FormData report) {
        repo.updateIsSolved(report.getId(), report.isSolved());
    }

    public List<FormData> getUserReports(UserData user) {
        if (user == null) {
            throw ApiException.unauthorized("You can't make this type of requests without loging in properly");
        }

        return repo.findByUserId(user.getId());
    }

    public void deleteReport(FormData data, UserData user) {
        if (user == null) {
            throw ApiException.unauthorized("You can't make this type of requests without loging in properly");
        }
        repo.delete(data);
    }
}
