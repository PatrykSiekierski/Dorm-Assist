package me.dormdesk.api.Controller;

import jakarta.servlet.http.HttpServletRequest;
import me.dormdesk.api.model.ExampleUsersData;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.service.ExampleUsersService;
import me.dormdesk.api.webtoken.JwtService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/example")
public class ExampleDataController {

    JwtService jwtService;
    ExampleUsersService service;

    public ExampleDataController(JwtService jwtService, ExampleUsersService service){
        this.jwtService = jwtService;
        this.service = service;
    }

    @CrossOrigin
    @GetMapping("/user/getAll")
    public List<ExampleUsersData> getAllExampleUsers(@RequestBody HttpServletRequest request) {
        String username = jwtService.getUsernameFromRequest(request);

        return service.getAllExampleUsers(username);
    }

    @CrossOrigin
    @PostMapping("/user/add")
    public ExampleUsersData addExampleUser(@RequestBody HttpServletRequest request) {
        String username = jwtService.getUsernameFromRequest(request);

        return service.addExampleUser(username);
    }

    public void deleteExampleUser(@RequestBody int exampleUserId) {}

}
