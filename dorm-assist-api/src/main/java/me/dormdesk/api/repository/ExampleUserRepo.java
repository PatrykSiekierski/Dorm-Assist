package me.dormdesk.api.repository;

import me.dormdesk.api.model.ExampleUsersData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExampleUserRepo extends JpaRepository<ExampleUsersData, Integer> {

    List<ExampleUsersData> findByUserId(int userId);
}
