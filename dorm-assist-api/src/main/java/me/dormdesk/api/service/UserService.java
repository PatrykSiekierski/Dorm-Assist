package me.dormdesk.api.service;

import lombok.AllArgsConstructor;
import me.dormdesk.api.config.PasswordEncodingConfig;
import me.dormdesk.api.model.ExampleReportData;
import me.dormdesk.api.model.ExampleUsersData;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.model.UserChangeModel;
import me.dormdesk.api.repository.UserRepo;
import me.dormdesk.api.utils.ApiException;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    UserRepo repo;
    PasswordEncoder passwordEncoder;
    ExampleDataService exampleDataService;
    ExampleReportService exampleReportService;
    FormService formService;

    public List<UserData> getUsers() {
        return repo.findAll();
    }

//    public ResponseEntity<String> deleteTargetUser(String username) {
//        Optional<UserData> user = repo.findByUsername(username);
//        if (user.isEmpty()) {
//            throw ApiException.unauthorized("You can't make this type of requests without loging in properly");
//        }
//
//        repo.delete(user.get());
//        return ResponseEntity.ok().body("The user has been deleted");
//    }

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

//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Optional<UserData> user = repo.findByUsername(username);
//        if (user.isPresent()) {
//            var userObj = user.get();
//            return User.builder()
//                    .username(userObj.getUsername())
//                    .password(userObj.getPassword())
//                    .roles(getRoles(userObj))
//                    .build();
//        } else {
//            throw new UsernameNotFoundException(username);
//        }
//    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserData> user = repo.findByUsername(username);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw ApiException.notFound("User with this username was not found.");
        }
    }

    public ResponseEntity<String> changePassword(UserData user, UserChangeModel userChangeModel) {
        if (user == null) {
            throw ApiException.unauthorized("You can't make this type of requests without loging in properly");
        }
        throwIfPasswordDiffers(user, userChangeModel.getPassword());

        String userInputNewPassword = userChangeModel.getDataToChange();
        if (Objects.equals(userInputNewPassword, "null") || userInputNewPassword == null) {
            throw ApiException.badRequest("Password is null");
        }
        user.setPassword(passwordEncoder.encode(userInputNewPassword));
        repo.save(user);

        return ResponseEntity.ok("Success");
    }

    public ResponseEntity<String> changeUsername(UserData user, UserChangeModel userChangeModel) {
        if (user == null) {
            throw ApiException.unauthorized("You can't make this type of requests without loging in properly");
        }
        throwIfPasswordDiffers(user, userChangeModel.getPassword());

        String newUsername = userChangeModel.getDataToChange();
        if (Objects.equals(newUsername, "null") || newUsername == null) {
            ResponseEntity.badRequest().body("Username is empty");
        }
        user.setUsername(newUsername);
        repo.save(user);

        return ResponseEntity.ok("Success");
    }

    public ResponseEntity<String> deleteUser(UserData user, String password) {
        if (user == null) {
            throw ApiException.unauthorized("You can't make this type of requests without logging in properly");
        }
        throwIfPasswordDiffers(user, password);

        exampleReportService.getAllReports(user)
                        .forEach(report -> exampleReportService.deleteExampleReport(report, user));
        exampleDataService.getAllExampleUsers(user)
                        .forEach(exUser -> exampleDataService.deleteExampleUser(exUser, user));
        formService.getUserReports(user)
                        .forEach(report -> formService.deleteReport(report, user));

        repo.delete(user);
        return ResponseEntity.ok("Success");
    }

    private void throwIfPasswordDiffers(UserData user, String password) {
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw ApiException.badRequest("Passed password is incorrect.");
        }
    }
}
