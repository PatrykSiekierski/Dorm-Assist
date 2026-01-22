package me.dormdesk.api.units;

import me.dormdesk.api.config.PasswordEncodingConfig;
import me.dormdesk.api.model.UserChangeModel;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.repository.UserRepo;
import me.dormdesk.api.service.UserService;
import me.dormdesk.api.utils.ApiException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserTest {

    @Mock
    UserRepo repo;

    @Mock
    PasswordEncodingConfig passwordEncodingConfig;

    @Mock
    PasswordEncoder passwordEncoder;

    UserService service;

    UserData user;

    @BeforeEach
    void setup() {
        when(passwordEncodingConfig.passwordEncoder()).thenReturn(passwordEncoder);
        service = new UserService(repo, passwordEncodingConfig);

        user = new UserData();
        user.setId(1);
        user.setUsername("test");
        user.setPassword("encodedPass");
    }

    @Test
    void shouldReturnUsers() {
        //given
        when(repo.findAll()).thenReturn(List.of(
                new UserData(),
                new UserData()
        ));

        //when
        List<UserData> users = service.getUsers();

        //then
        assertEquals(2, users.size());
        verify(repo).findAll();
    }

    @Test
    void shouldLogInUser() {
        //given
        when(repo.findByUsername("test")).thenReturn(Optional.of(user));

        //when
        UserDetails result = service.loadUserByUsername("test");

        //then
        assertEquals(user, result);
    }

    @Test
    void shouldThrowWhenUserIsNullInLoadUserByUsername() {
        //given
        when(repo.findByUsername("missing")).thenReturn(Optional.empty());

        //when & then
        assertThrows(ApiException.class,
                () -> service.loadUserByUsername("missing"));
    }

    @Test
    void shouldThrowErrorWhenUserIsNull() {
        //when & then
        assertThrows(ApiException.class,
                () -> service.changePassword(null, new UserChangeModel()));
    }

    @Test
    void shouldThrowWhenPasswordIsNullInChangingPassword() {
        //given
        UserChangeModel model = new UserChangeModel();
        model.setPassword("wrong");
        model.setDataToChange("newPass");

        when(passwordEncoder.matches("wrong", "encodedPass")).thenReturn(false);

        //when & then
        assertThrows(ApiException.class, () -> service.changePassword(user, model));
    }

    @Test
    void shouldChangePassword() {
        //given
        UserChangeModel model = new UserChangeModel();
        model.setPassword("correct");
        model.setDataToChange("newPass");

        when(passwordEncoder.matches("correct", "encodedPass")).thenReturn(true);
        when(passwordEncoder.encode("newPass")).thenReturn("encodedNew");

        //when
        ResponseEntity<String> response = service.changePassword(user, model);

        //then
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("encodedNew", user.getPassword());
        verify(repo).save(user);
    }

    @Test
    void shouldChangeUsername() {
        //given
        UserChangeModel model = new UserChangeModel();
        model.setPassword("correct");
        model.setDataToChange("newUsername");

        when(passwordEncoder.matches("correct", "encodedPass")).thenReturn(true);

        //when
        ResponseEntity<String> response = service.changeUsername(user, model);

        //then
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("newUsername", user.getUsername());
        verify(repo).save(user);
    }

    @Test
    void shouldThrowWhenDeletingUserWithWrongPassword() {
        //given
        when(passwordEncoder.matches("wrong", "encodedPass")).thenReturn(false);

        //when & then
        assertThrows(ApiException.class, ()-> service.deleteUser(user, "wrong"));
    }

    @Test
    void shouldDeleteUser() {
        //given
        when(passwordEncoder.matches("correct", "encodedPass")).thenReturn(true);

        //when
        ResponseEntity<String> response = service.deleteUser(user, "correct");

        //then
        assertEquals(200, response.getStatusCodeValue());
        verify(repo).delete(user);
    }
}
