package me.dormdesk.api.Controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Sample report controller", description = "Allows creation of sample reports assigned to 'sample users' for main user to manage in admin panel.")
public class ExampleReportController {

    JwtService jwtService;
    ExampleReportService service;

    public ExampleReportController(ExampleReportService service, JwtService jwtService) {
        this.jwtService = jwtService;
        this.service = service;
    }

    @Operation(summary = "Retruns sample reports", description = "Returns sample reports assigned to this account")
    @GetMapping("/getall")
    public List<ExampleReportData> getAllReports(@AuthenticationPrincipal UserData user) {
        return service.getAllReports(user);
    }

    @CrossOrigin
    @Operation(summary = "Creates sample report", description = "Creates sample report for administrative purposes.")
    @PostMapping("/add")
    public ExampleReportData addExampleReport(@AuthenticationPrincipal UserData user) {
        return service.addExampleReport(user);
    }

//    @CrossOrigin
//    @Operation(summary = "Delete sample user")
//    @DeleteMapping("/delete")
//    public void deleteExampleReport(@RequestBody ExampleReportData exampleReportData, @AuthenticationPrincipal UserData user) {
//        service.deleteExampleReport(exampleReportData, user);
//    }

    @Operation(summary = "Updates sample reports", description = "Updates fields of sample reports. Administration panel only supports 'isSolved' state.")
    @PutMapping("/update")
    public void updateExampleReport(@RequestBody ExampleReportData exampleReportData, @AuthenticationPrincipal UserData user) {
        service.updateExampleReport(exampleReportData, user);
    }
}
