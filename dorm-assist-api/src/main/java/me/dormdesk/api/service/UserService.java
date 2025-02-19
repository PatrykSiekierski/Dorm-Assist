package me.dormdesk.api.service;

import me.dormdesk.api.model.LoginForm;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.model.UserPasswordChangeModel;
import me.dormdesk.api.repository.UserRepo;
import me.dormdesk.api.webtoken.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    UserRepo repo;
    PasswordEncoder passwordEncoder;


    public UserService(UserRepo repo) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserData> getUsers() {
        return repo.findAll();
    }

    // Password not yet use passwordEncoder for easier development. For change in near future.
//    public RegistrationResponse createUser(UserData newUser) {
//        List<UserData> allUsers = repo.findAll();
//        for (UserData userData : allUsers) {
//            if (userData.getEmail().equals(newUser.getEmail())) {
//                return new RegistrationResponse("error", "This email already exist");
//            }
//
//            if (userData.getUsername().equals(newUser.getUsername())) {
//                return new RegistrationResponse("error", "This username already exist");
//            }
//        }
//
//        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
//
//        repo.save(newUser);
//        return new RegistrationResponse("success", "The new account have been created successfully");
//    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserData> user = repo.findByUsername(username);
        if (user.isPresent()) {
            var userObj = user.get();
            return User.builder()
                    .username(userObj.getUsername())
                    .password(userObj.getPassword())
                    .roles(getRoles(userObj))
                    .build();
        } else {
            throw new UsernameNotFoundException(username);
        }
    }

    private String[] getRoles(UserData user) {
        if (user.getRole() == null) {
            return new String[]{"USER"};
        }
        return user.getRole().split(",");
    }

    public ResponseEntity<String> changePassword(String username, UserPasswordChangeModel userPasswordChangeModel) {
        Optional<UserData> user = repo.findByUsername(username);
        if(!user.isPresent()) {
            return ResponseEntity.badRequest().body("Could not find the user");
        }

        String userPassword = user.get().getPassword();
        String userInputPassword = userPasswordChangeModel.getOldPassword();
        String userInputNewPassword = userPasswordChangeModel.getNewPassword();
        if (userPassword.equals(userInputPassword)) {
            user.get().setPassword(passwordEncoder.encode(userInputNewPassword));
            repo.save(user.get());
            return ResponseEntity.ok("Success");
        }

        return ResponseEntity.badRequest().body("The original password is incorrect.");
    }

    public boolean deleteUser(UserData user) {
        repo.delete(user);
        return false;
    }
}
