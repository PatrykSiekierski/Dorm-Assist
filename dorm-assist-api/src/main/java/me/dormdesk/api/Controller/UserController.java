package me.dormdesk.api.Controller;

import jakarta.servlet.http.HttpServletRequest;
import me.dormdesk.api.model.LoginForm;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.model.UserChangeModel;
import me.dormdesk.api.service.UserService;
import me.dormdesk.api.webtoken.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    @DeleteMapping("/admin/deletetarget")
    public ResponseEntity<String> deleteTargetUser(@RequestBody String username) {
        return service.deleteTargetUser(username);
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
    @PutMapping("/change/password")
    public ResponseEntity<String> changePassword(@RequestBody UserChangeModel userChangeModel, @AuthenticationPrincipal UserData user) {
        return service.changePassword(user, userChangeModel);
    }

    @CrossOrigin
    @PutMapping("/change/username")
    public ResponseEntity<String> changeUsername(@RequestBody UserChangeModel userChangeModel, @AuthenticationPrincipal UserData user) {
        return service.changeUsername(user, userChangeModel);
    }

    @CrossOrigin
    @DeleteMapping("/change/delete")
    public ResponseEntity<String> deleteUser(@RequestBody String password, @AuthenticationPrincipal UserData user) {
        return service.deleteUser(user, password);
    }
}
