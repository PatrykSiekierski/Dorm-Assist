package me.dormdesk.api.units;

import me.dormdesk.api.model.ExampleReportData;
import me.dormdesk.api.model.ExampleUsersData;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.repository.ExampleReportRepo;
import me.dormdesk.api.repository.ExampleUserRepo;
import me.dormdesk.api.service.ExampleReportService;
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
public class ExampleReportTest {

    @Mock
    ExampleUserRepo exampleUserRepo;

    @Mock
    ExampleReportRepo exampleReportRepo;

    @InjectMocks
    ExampleReportService service;

    UserData user;
    ExampleUsersData exampleUser;

    @BeforeEach
    void setup() {
        user = new UserData(
                1,
                "test@mail.com",
                "testuser",
                "password",
                "101A",
                "USER",
                null
        );

        exampleUser = new ExampleUsersData(
                user,
                "test@mail.com",
                "testuser",
                "101A"
        );
    }

    @Test
    void shouldGetAllReportsFromUser() {
        //given
        ExampleReportData report = mock(ExampleReportData.class);

        when(exampleUserRepo.findByUserId(user.getId()))
                .thenReturn(List.of(exampleUser));

        when(exampleReportRepo.findByExampleUserData(exampleUser))
                .thenReturn(List.of(report));

        //when
        List<ExampleReportData> result = service.getAllReports(user);

        //then
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(exampleUserRepo).findByUserId(user.getId());
    }

    @Test
    void shouldAddExampleReport() {
        //given
        when(exampleUserRepo.findByUserId(user.getId()))
                .thenReturn(List.of(exampleUser));

        ExampleReportData savedReport = mock(ExampleReportData.class);
        when(exampleReportRepo.save(any()))
                .thenReturn(savedReport);

        //when
        ExampleReportData result = service.addExampleReport(user);

        //then
        assertNotNull(result);
        verify(exampleReportRepo).save(any(ExampleReportData.class));
    }

    @Test
    void shouldThrowWhenUserIsNullOnExampleReport() {
        //when
        when(exampleUserRepo.findByUserId(user.getId()))
                .thenReturn(List.of());

        //then
        assertThrows(RuntimeException.class,
                () -> service.addExampleReport(user));
    }

    @Test
    void shouldDeleteExampleReport() {
        //given
        ExampleReportData report = mock(ExampleReportData.class);
        when(report.getId()).thenReturn(10);
        when(report.getExampleUserData()).thenReturn(exampleUser);

        //when
        service.deleteExampleReport(report, user);

        //then
        verify(exampleReportRepo).deleteById(10);
    }

    @Test
    void shouldThrowWhenDeleteOtherUsersUserExampleReport() {
        //given
        UserData otherUser = new UserData();
        otherUser.setId(99);

        ExampleUsersData otherExampleUser = mock(ExampleUsersData.class);
        when(otherExampleUser.getUser()).thenReturn(otherUser);

        ExampleReportData report = mock(ExampleReportData.class);
        when(report.getExampleUserData()).thenReturn(otherExampleUser);

        //when
        assertThrows(ApiException.class, () -> service.deleteExampleReport(report, user));

        //then
        verify(exampleReportRepo, never()).deleteById(any());
    }

}
