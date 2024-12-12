package me.dormdesk.api.service;

import jakarta.transaction.Transactional;
import me.dormdesk.api.model.FormData;
import me.dormdesk.api.repository.FormRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormService {

    FormRepo repo;

    public FormService(FormRepo repo) {
        this.repo = repo;
    }

    public List<FormData> getReports() {
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
}
