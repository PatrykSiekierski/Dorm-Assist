package me.dormdesk.api.units;

import me.dormdesk.api.model.FormData;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.repository.FormRepo;
import me.dormdesk.api.repository.UserRepo;
import me.dormdesk.api.service.FormService;
import me.dormdesk.api.utils.ApiException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FormTest {

    @Mock
    FormRepo formRepo;

    @Mock
    UserRepo userRepo;

    @InjectMocks
    FormService service;

    UserData user;

    @BeforeEach
    void setup() {
        user = new UserData();
        user.setId(1);
    }

    @Test
    void shouldCreateNewReport() {
        //given
        FormData form = new FormData();

        //when
        service.createNewReport(form, user);

        //then
        assertEquals(user, form.getUser());
        verify(formRepo).save(form);
    }

    @Test
    void shouldUpdateForms() {
        //given
        FormData form = new FormData();
        form.setId(10);
        form.setSolved(true);

        //when
        service.updateForms(form);

        //then
        verify(formRepo).updateIsSolved(10, true);
    }

    @Test
    void shouldThrowWhenUserIsNullOnGettingUserReport() {
        //when & then
        assertThrows(ApiException.class,
                () -> service.getUserReports(null));
    }

    @Test
    void shouldGetReports() {
        //given
        List<FormData> forms = List.of(new FormData());

        when(formRepo.findByUserId(1)).thenReturn(forms);

        //when
        List<FormData> result = service.getUserReports(user);

        //then
        assertEquals(1, result.size());
        verify(formRepo).findByUserId(1);
    }
}
