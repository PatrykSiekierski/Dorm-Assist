package me.dormdesk.api.Controller;

import me.dormdesk.api.model.UserData;
import me.dormdesk.api.service.FormService;
import me.dormdesk.api.service.UserService;
import me.dormdesk.api.util.RegistrationResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @CrossOrigin
    @GetMapping("/get")
    public List<UserData> getUsers() {
        return service.getUsers();
    }

    @CrossOrigin
    @PostMapping("/create")
    public RegistrationResponse createUsers(@RequestBody UserData newUser) {
        return service.createUser(newUser);
    }
}
