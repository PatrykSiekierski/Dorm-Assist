package me.dormdesk.api.service;

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
        return repo.findAll();
    }

    public void sendToRepo(FormData data) {
        repo.save(data);
    }
}
