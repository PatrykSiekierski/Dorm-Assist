package me.dormdesk.api.Controller;

import jakarta.servlet.http.HttpServletRequest;
import me.dormdesk.api.model.FormData;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.service.FormService;
import me.dormdesk.api.webtoken.JwtService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/form")
@CrossOrigin()
public class FormController {

    JwtService jwtService;
    FormService service;

    public FormController(FormService service) {
        this.service = service;
    }

//    @GetMapping("/admin/getsample")
//    public List<FormData> getSampleReports() {
//        return service.getSampleReports();
//    }

    @GetMapping("/admin/get")
    public List<FormData> getUserReports(@AuthenticationPrincipal UserData user) {
        return service.getUserReports(user);
    }

    @PostMapping("/admin/post")
    public FormData postTest(@RequestBody FormData report, @AuthenticationPrincipal UserData user) {
        System.out.println(report);

//        System.out.println("Pokój: " + report.getRoomNumber());
        service.sendToRepo(report, user);
        return report;
    }

    @PutMapping("/admin/update/solved")
    public void updateForms(@RequestBody FormData report) {
        service.updateForms(report);
    }

}