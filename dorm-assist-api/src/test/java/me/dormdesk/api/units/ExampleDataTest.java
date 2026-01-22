package me.dormdesk.api.units;

import me.dormdesk.api.model.ExampleReportData;
import me.dormdesk.api.model.ExampleUsersData;
import me.dormdesk.api.model.UserData;
import me.dormdesk.api.repository.ExampleUserRepo;
import me.dormdesk.api.service.ExampleDataService;
import me.dormdesk.api.service.ExampleReportService;
import me.dormdesk.api.utils.ApiException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ExampleDataTest {

    @Mock
    ExampleUserRepo exampleUserRepo;

    @Mock
    ExampleReportService exampleReportService;

    @InjectMocks
    ExampleDataService service;

    UserData user;

    @BeforeEach
    void setup() {
        user = new UserData();
        user.setId(1);
    }

    @Test
    void shouldThrowBadRequestWhenUserIsNull() {
        //when & then
        assertThrows(ApiException.class,
                () -> service.getAllExampleUsers(null));
    }

    @Test
    void shouldGetAllExampleUsers() {
        //given
        List<ExampleUsersData> users = List.of(
                new ExampleUsersData(),
                new ExampleUsersData()
        );

        when(exampleUserRepo.findByUserId(1)).thenReturn(users);

        //when
        List<ExampleUsersData> result = service.getAllExampleUsers(user);

        //then
        assertEquals(2, result.size());
    }

    @Test
    void shouldThrowWhenUserIsNullOnAddingUser() {
        //when & then
        assertThrows(ApiException.class,
                () -> service.addExampleUser(null));
    }

        @Test
        void shouldAddExampleUser() {
            //given
            ExampleUsersData generated = new ExampleUsersData();
            generated.setEmail("test@test.com");
            generated.setUser(user);

            when(exampleUserRepo.findByEmail(any()))
                    .thenReturn(Optional.empty());

            //when
            service.addExampleUser(user);

            //then
            verify(exampleUserRepo).save(any());
        }

    @Test
    void shouldThrowWhenDeleteUserIsNullInDeleteExampleUser() {
        //given
        ExampleUsersData exampleUser = new ExampleUsersData();

        //when & then
        assertThrows(ApiException.class,
                () -> service.deleteExampleUser(exampleUser, null));
    }

    @Test
    void shouldThrowWhenDeletingExampleUserOfDifferentOwner() {
        //given
        UserData otherUser = new UserData();
        otherUser.setId(2);

        ExampleUsersData exampleUser = new ExampleUsersData();
        exampleUser.setUser(otherUser);

        //when & then
        assertThrows(RuntimeException.class,
                () -> service.deleteExampleUser(exampleUser, user));
    }

    @Test
    void shouldDeleteAllReportsOfExampleUser() {
        //given
        ExampleUsersData exampleUser = new ExampleUsersData();
        exampleUser.setId(10);
        exampleUser.setUser(user);

        ExampleReportData report = mock(ExampleReportData.class);
        ExampleUsersData reportUser = new ExampleUsersData();
        reportUser.setId(10);

        when(report.getExampleUserData()).thenReturn(reportUser);
        when(exampleReportService.getAllReports(user))
                .thenReturn(List.of(report));

        //when
        service.deleteExampleUser(exampleUser, user);

        //then
        verify(exampleReportService).deleteExampleReport(report, user);
        verify(exampleUserRepo).deleteById(10);
    }
}
