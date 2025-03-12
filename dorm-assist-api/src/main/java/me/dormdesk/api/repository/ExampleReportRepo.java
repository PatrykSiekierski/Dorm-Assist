package me.dormdesk.api.repository;

import me.dormdesk.api.model.ExampleReportData;
import me.dormdesk.api.model.ExampleUsersData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExampleReportRepo extends JpaRepository<ExampleReportData, Integer> {

    List<ExampleReportData> findByExampleUserData(ExampleUsersData exampleUsersData);

}
