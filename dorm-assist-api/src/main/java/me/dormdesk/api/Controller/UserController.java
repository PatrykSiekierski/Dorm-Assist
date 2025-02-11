package me.dormdesk.api.Controller;

import me.dormdesk.api.model.LoginForm;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.service.UserService;
import me.dormdesk.api.webtoken.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    UserService service;
    AuthenticationManager authenticationManager;
    JwtService jwtService;

    public UserController(UserService service, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.service = service;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    //Temporary, so it can verify user permissions
    @CrossOrigin
    @GetMapping("/admin/verify")
    public boolean verifyAdmin() {
        return true;
    }

    @CrossOrigin
    @GetMapping("/admin/get")
    public List<UserData> getUsers() {
        return service.getUsers();
    }

    @CrossOrigin
    @PostMapping("/authenticate")
    public String authenticateAndGetToken(@RequestBody LoginForm loginForm) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginForm.getUsername(), loginForm.getPassword()
        ));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(service.loadUserByUsername(loginForm.getUsername()));
        } else {
            throw new UsernameNotFoundException("Invalid credentials");
        }
    }

    @CrossOrigin
    @DeleteMapping("/admin/delete")
    public boolean deleteUser(@RequestBody UserData user) {
        return service.deleteUser(user);
    }
}
