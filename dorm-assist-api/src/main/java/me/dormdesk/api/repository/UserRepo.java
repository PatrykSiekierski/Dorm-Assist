package me.dormdesk.api.repository;

import me.dormdesk.api.model.UserData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<UserData, Integer> {
}
