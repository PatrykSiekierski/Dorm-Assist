package me.dormdesk.api.repository;

import me.dormdesk.api.model.ExampleUsersData;
import me.dormdesk.api.model.FormData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FormRepo extends JpaRepository<FormData, Integer> {

    @Modifying
    @Query("UPDATE FormData f SET f.isSolved = :isSolved WHERE f.id = :id")
    void updateIsSolved(@Param("id") int id, @Param("isSolved") boolean isSolved);

    FormData findByUserId(int userId);

}
