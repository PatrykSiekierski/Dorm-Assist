package me.dormdesk.api.service;

import me.dormdesk.api.config.PasswordEncodingConfig;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.model.UserChangeModel;
import me.dormdesk.api.repository.UserRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    UserRepo repo;
    PasswordEncoder passwordEncoder;


    public UserService(UserRepo repo, PasswordEncodingConfig passwordEncodingConfig) {
        this.repo = repo;
        this.passwordEncoder = passwordEncodingConfig.passwordEncoder();
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

    public ResponseEntity<String> changePassword(String username, UserChangeModel userChangeModel) {
        Optional<UserData> user = repo.findByUsername(username);
        ResponseEntity<String> verifyUser = isUserVerified(user, userChangeModel.getPassword());
        if (verifyUser != null) return verifyUser;

        String userInputNewPassword = userChangeModel.getNewData();
        user.get().setPassword(passwordEncoder.encode(userInputNewPassword));
        repo.save(user.get());

        return ResponseEntity.ok("Success");
    }

    public ResponseEntity<String> changeUsername(String username, UserChangeModel userChangeModel) {
        Optional<UserData> user = repo.findByUsername(username);
        ResponseEntity<String> verifyUser = isUserVerified(user, userChangeModel.getPassword());
        //Returns error if encounter problem with either username or password
        if (verifyUser != null) return verifyUser;

        String newUsername = userChangeModel.getNewData();
        user.get().setUsername(newUsername);
        repo.save(user.get());

        return ResponseEntity.ok("Success");
    }

    public ResponseEntity<String> deleteUser(String username, String password) {
        Optional<UserData> user = repo.findByUsername(username);
        ResponseEntity<String> verifyUser = isUserVerified(user, password);
        //Returns error if encounter problem with either username or password
        if (verifyUser != null) return verifyUser;

        repo.delete(user.get());

        return ResponseEntity.ok("Success");
    }

    private ResponseEntity<String> isUserVerified(Optional<UserData> user, String password) {
        if(!user.isPresent()) {
            return ResponseEntity.badRequest().body("Could not find the user");
        }

        if (!passwordEncoder.matches(password, user.get().getPassword())) {
            return ResponseEntity.badRequest().body("The original password is incorrect.");
        }

        return null;
    }

}
