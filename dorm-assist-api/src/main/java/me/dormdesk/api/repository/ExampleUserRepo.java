package me.dormdesk.api.repository;

import me.dormdesk.api.model.ExampleUsersData;
import me.dormdesk.api.model.UserData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ExampleUserRepo extends JpaRepository<ExampleUsersData, Integer> {

    List<ExampleUsersData> findByUserId(int userId);
    Optional<ExampleUsersData> findByEmail(String email);

}
