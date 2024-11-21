package me.dormdesk.api.repository;

import me.dormdesk.api.model.FormData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormRepo extends JpaRepository<FormData, Integer> {


}
