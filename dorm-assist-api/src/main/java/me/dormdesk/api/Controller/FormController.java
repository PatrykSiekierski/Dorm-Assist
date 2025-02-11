package me.dormdesk.api.Controller;

import me.dormdesk.api.model.FormData;
import me.dormdesk.api.service.FormService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/form")
@CrossOrigin()
public class FormController {

    FormService service;

    public FormController(FormService service) {
        this.service = service;
    }

    @GetMapping("/admin/get")
    public List<FormData> getReports() {
        return service.getReports();
    }

    @PostMapping("/admin/post")
    public FormData postTest(@RequestBody FormData report) {
        System.out.println(report);

        System.out.println("Pokój: " + report.getRoomNumber());
        service.sendToRepo(report);
        return report;
    }

    @PutMapping("/admin/update/solved")
    public void updateForms(@RequestBody FormData report) {
        service.updateForms(report);
    }

}
