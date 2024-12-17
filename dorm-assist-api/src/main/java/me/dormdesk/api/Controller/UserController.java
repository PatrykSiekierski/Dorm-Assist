package me.dormdesk.api.Controller;

import me.dormdesk.api.model.UserData;
import me.dormdesk.api.service.FormService;
import me.dormdesk.api.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/get")
    public List<UserData> getUsers() {
        return service.getUsers();
    }

    @PostMapping("/create")
    public UserData createUsers(@RequestBody UserData newUser) {
        service.createUser(newUser);
        return newUser;
    }
}
