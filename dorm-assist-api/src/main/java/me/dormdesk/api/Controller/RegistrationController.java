package me.dormdesk.api.Controller;

import me.dormdesk.api.config.PasswordEncodingConfig;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registration")
public class RegistrationController {

    private UserRepo myUserRepository;
    private PasswordEncoder passwordEncoder;

    public RegistrationController(UserRepo myUserRepository, PasswordEncodingConfig passwordEncoder) {
        this.myUserRepository = myUserRepository;
        this.passwordEncoder = passwordEncoder.passwordEncoder();
    }

    @CrossOrigin
    @PostMapping("/create")
    public UserData createUser(@RequestBody UserData user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return myUserRepository.save(user);
    }
}
