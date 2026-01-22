package me.dormdesk.api.Controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import me.dormdesk.api.config.PasswordEncodingConfig;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registration")
@Tag(name = "Registration controller", description = "Allows creation of account with ADMIN privilege.")
public class RegistrationController {

    private UserRepo myUserRepository;
    private PasswordEncoder passwordEncoder;

    public RegistrationController(UserRepo myUserRepository, PasswordEncodingConfig passwordEncoder) {
        this.myUserRepository = myUserRepository;
        this.passwordEncoder = passwordEncoder.passwordEncoder();
    }

    @Operation(summary = "Creates user", description = "Creates user with admin privileges.")
    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody UserData user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(myUserRepository.findByUsername(user.getUsername()));
        if (myUserRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.ok().header("Email").body("This email already exist.");
        }
        if (myUserRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.ok().header("Username").body("This username already exist.");
        }

        user.setRole("ADMIN");
        myUserRepository.save(user);
        return ResponseEntity.ok().body("");
    }
}
