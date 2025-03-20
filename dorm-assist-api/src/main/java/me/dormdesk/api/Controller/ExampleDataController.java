package me.dormdesk.api.Controller;

import jakarta.servlet.http.HttpServletRequest;
import me.dormdesk.api.model.ExampleUsersData;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.service.ExampleUsersService;
import me.dormdesk.api.webtoken.JwtService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/example")
public class ExampleDataController {

    ExampleUsersService service;

    public ExampleDataController(ExampleUsersService service){
        this.service = service;
    }

    @CrossOrigin
    @GetMapping("/user/getall")
    public List<ExampleUsersData> getAllExampleUsers(@AuthenticationPrincipal UserData user) {
        return service.getAllExampleUsers(user);
    }

    @PostMapping("/user/add")
    public ExampleUsersData addExampleUser(@AuthenticationPrincipal UserData user) {
        return service.addExampleUser(user);
    }

    @CrossOrigin
    @DeleteMapping("/user/delete")
    public void deleteExampleUser(@RequestBody ExampleUsersData exampleUsersData, @AuthenticationPrincipal UserData user) {
        service.deleteExampleUser(exampleUsersData, user);
    }

}
