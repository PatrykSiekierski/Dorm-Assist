package me.dormdesk.api.Controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import me.dormdesk.api.model.ExampleUsersData;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.service.ExampleDataService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/example")
@Tag(name = "Sample data controller", description = "Allows creation of sample data for user to manage in admin panel.")
public class ExampleDataController {

    ExampleDataService service;

    public ExampleDataController(ExampleDataService service){
        this.service = service;
    }

    @Operation(summary = "Gets all sample users", description = "Return all sample users assigned to this account.")
    @CrossOrigin
    @GetMapping("/user/getall")
    public List<ExampleUsersData> getAllExampleUsers(@AuthenticationPrincipal UserData user) {
        return service.getAllExampleUsers(user);
    }

    @Operation(summary = "Creates sample user", description = "Creates sample user for sample report purposes.")
    @PostMapping("/user/add")
    public ExampleUsersData addExampleUser(@AuthenticationPrincipal UserData user) {
        return service.addExampleUser(user);
    }

    @Operation(summary = "Delete sample user")
    @CrossOrigin
    @DeleteMapping("/user/delete")
    public void deleteExampleUser(@RequestBody ExampleUsersData exampleUsersData, @AuthenticationPrincipal UserData user) {
        service.deleteExampleUser(exampleUsersData, user);
    }

}
