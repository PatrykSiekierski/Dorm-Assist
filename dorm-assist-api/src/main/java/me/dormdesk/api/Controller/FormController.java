package me.dormdesk.api.Controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import me.dormdesk.api.model.FormData;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.service.FormService;
import me.dormdesk.api.webtoken.JwtService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/form")
@Tag(name = "Form controller", description = "Takes care of creating, sending and managing forms from real users.")
public class FormController {

    JwtService jwtService;
    FormService service;

    public FormController(FormService service) {
        this.service = service;
    }

    @Operation(summary = "Returns all Reports", description = "Returns real reports with those created manually by user.")
    @GetMapping("/admin/get")
    public List<FormData> getUserReports(@AuthenticationPrincipal UserData user) {
        return service.getUserReports(user);
    }

    @Operation(summary = "Creates new report", description = "Saves report manually created by user.")
    @PostMapping("/admin/post")
    public FormData createNewReport(@RequestBody FormData report, @AuthenticationPrincipal UserData user) {
        service.createNewReport(report, user);
        return report;
    }

    @Operation(summary = "Updated report", description = "Allows for changes like changing if its solved.")
    @PutMapping("/admin/update/solved")
    public void updateForms(@RequestBody FormData report) {
        service.updateForms(report);
    }

}