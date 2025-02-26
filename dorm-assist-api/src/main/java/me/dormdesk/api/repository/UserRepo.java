package me.dormdesk.api.repository;

import me.dormdesk.api.model.UserData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<UserData, Integer> {

    Optional<UserData> findByUsername(String username);
    Optional<UserData> findByEmail(String email);
}
