package me.dormdesk.api.Controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "User controller", description = "Allows managing user's account.")
public class UserController {

    UserService service;
    AuthenticationManager authenticationManager;
    JwtService jwtService;

    public UserController(UserService service, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.service = service;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Operation(summary = "Quick admin validation", description = "Debugging tool for validating jwt status.")
    @CrossOrigin
    @GetMapping("/admin/verify")
    public boolean verifyAdmin() {
        return true;
    }

    @Operation(summary = "Retruns ALL users", description = "Return list of ALL users, including generated and real users.")
    @CrossOrigin
    @GetMapping("/admin/get")
    public List<UserData> getUsers() {
        return service.getUsers();
    }

    @Operation(summary = "User log in", description = "Verifies user credentials and generated JWT token.")
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

    @Operation(summary = "Change Password", description = "Allows user to change password")
    @CrossOrigin
    @PutMapping("/change/password")
    public ResponseEntity<String> changePassword(@RequestBody UserChangeModel userChangeModel, @AuthenticationPrincipal UserData user) {
        return service.changePassword(user, userChangeModel);
    }

    @Operation(summary = "Change Username", description = "Allows user to change username")
    @CrossOrigin
    @PutMapping("/change/username")
    public ResponseEntity<String> changeUsername(@RequestBody UserChangeModel userChangeModel, @AuthenticationPrincipal UserData user) {
        return service.changeUsername(user, userChangeModel);
    }

    @Operation(summary = "Deletes account", description = "Allows user to delete account")
    @CrossOrigin
    @DeleteMapping("/change/delete")
    public ResponseEntity<String> deleteUser(@RequestBody String password, @AuthenticationPrincipal UserData user) {
        return service.deleteUser(user, password);
    }
}
