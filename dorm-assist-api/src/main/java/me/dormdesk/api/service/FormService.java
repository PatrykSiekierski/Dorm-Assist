package me.dormdesk.api.service;

import jakarta.transaction.Transactional;
import me.dormdesk.api.model.FormData;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.repository.FormRepo;
import me.dormdesk.api.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FormService {

    UserRepo userRepo;
    FormRepo repo;

    public FormService(FormRepo repo, UserRepo userRepo) {
        this.userRepo = userRepo;
        this.repo = repo;
    }

    public List<FormData> getSampleReports() {
        return repo.findAll().reversed();
    }

    public void sendToRepo(FormData data) {
        repo.save(data);
    }

    @Transactional
    public void updateForms(FormData report) {
//        for (FormData report : reports) {
            repo.updateIsSolved(report.getId(), report.isSolved());
//        }
    }

    public FormData getUserReports(UserData user) {
        if (user == null) {
            //Need to make and error/exception that user is empty
            return null;
        }

        return repo.findByUserId(user.getId());
    }
}
