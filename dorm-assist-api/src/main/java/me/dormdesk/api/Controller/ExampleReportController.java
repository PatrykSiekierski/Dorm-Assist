package me.dormdesk.api.Controller;

import jakarta.servlet.http.HttpServletRequest;
import me.dormdesk.api.model.ExampleReportData;
import me.dormdesk.api.model.ExampleUsersData;
import me.dormdesk.api.model.FormData;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.service.ExampleReportService;
import me.dormdesk.api.webtoken.JwtService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/example/report")
public class ExampleReportController {

    JwtService jwtService;
    ExampleReportService service;

    public ExampleReportController(ExampleReportService service, JwtService jwtService) {
        this.jwtService = jwtService;
        this.service = service;
    }

    @GetMapping("/getall")
    public List<ExampleReportData> getAllReports(@AuthenticationPrincipal UserData user) {
        return service.getAllReports(user);
    }

    @CrossOrigin
    @PostMapping("/add")
    public ExampleReportData addExampleReport(@AuthenticationPrincipal UserData user) {
        return service.addExampleReport(user);
    }

    @CrossOrigin
    @DeleteMapping("/delete")
    public void deleteExampleReport(@RequestBody ExampleReportData exampleReportData, @AuthenticationPrincipal UserData user) {
        service.deleteExampleReport(exampleReportData, user);
    }

    @PutMapping("/update")
    public void updateExampleReport(@RequestBody ExampleReportData exampleReportData, @AuthenticationPrincipal UserData user) {
        service.updateExampleReport(exampleReportData, user);
    }
}
