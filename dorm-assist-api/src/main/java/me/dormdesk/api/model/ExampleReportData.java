package me.dormdesk.api.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Entity
@Table(name = "example_reports")
public class ExampleReportData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int example_user_id;
    private String roomNumber;
    private String operatingSystem;
    private boolean socketMounted;
    private boolean wasInternetWorking;
    private String problemDescription;
    private boolean isSolved = false;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;


    public ExampleReportData() {
    }

    public ExampleReportData(int example_user_id, String roomNumber, String operatingSystem, boolean socketMounted, boolean wasInternetWorking, String problemDescription, boolean isSolved) {
        this.example_user_id = example_user_id;
        this.roomNumber = roomNumber;
        this.operatingSystem = operatingSystem;
        this.socketMounted = socketMounted;
        this.wasInternetWorking = wasInternetWorking;
        this.problemDescription = problemDescription;
        this.isSolved = isSolved;
    }

    public ExampleReportData(int id, int example_user_id, String roomNumber, String operatingSystem, boolean socketMounted, boolean wasInternetWorking, String problemDescription, boolean isSolved, LocalDateTime createdAt) {
        this.id = id;
        this.example_user_id = example_user_id;
        this.roomNumber = roomNumber;
        this.operatingSystem = operatingSystem;
        this.socketMounted = socketMounted;
        this.wasInternetWorking = wasInternetWorking;
        this.problemDescription = problemDescription;
        this.isSolved = isSolved;
        this.createdAt = createdAt;
    }
}
