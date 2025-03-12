package me.dormdesk.api.Controller;

import jakarta.servlet.http.HttpServletRequest;
import me.dormdesk.api.model.ExampleReportData;
import me.dormdesk.api.model.ExampleUsersData;
import me.dormdesk.api.service.ExampleReportService;
import me.dormdesk.api.webtoken.JwtService;
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
    public List<ExampleReportData> getAllReports(HttpServletRequest request) {
        String username = jwtService.getUsernameFromRequest(request);

        return service.getAllReports(username);
    }

    @CrossOrigin
    @PostMapping("/add")
    public ExampleReportData addExampleUser(@RequestBody ExampleUsersData exampleUsersData) {
        return service.addExampleReport(exampleUsersData);
    }

    @CrossOrigin
    @DeleteMapping("/delete")
    public void deleteExampleUser(@RequestBody ExampleReportData exampleReportData, HttpServletRequest request) {
        String username = jwtService.getUsernameFromRequest(request);

        service.deleteExampleReport(exampleReportData);
    }

}
