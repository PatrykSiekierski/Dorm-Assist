package me.dormdesk.api.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Entity
public class FormData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserData user;

//    private String roomNumber;
    private String operatingSystem;
    private boolean socketMounted;
    private boolean wasInternetWorking;
    private String problemDescription;
    private boolean isSolved = false;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Override
    public String toString() {
        return "FormData{" +
                "id=" + id +
                ", operatingSystem='" + operatingSystem + '\'' +
                ", socketMounted=" + socketMounted +
                ", wasInternetWorking=" + wasInternetWorking +
                ", problemDescription='" + problemDescription + '\'' +
                ", isSolved=" + isSolved +
                ", createdAt=" + createdAt +
                '}';
    }

    public FormData() {
    }

    public FormData(int id, String operatingSystem, boolean socketMounted, boolean wasInternetWorking, String problemDescription) {
        this.id = id;
        this.operatingSystem = operatingSystem;
        this.socketMounted = socketMounted;
        this.wasInternetWorking = wasInternetWorking;
        this.problemDescription = problemDescription;
    }

    public FormData(int id, String roomNumber, String operatingSystem, boolean socketMounted, boolean wasInternetWorking, String problemDescription, boolean isSolved, LocalDateTime createdAt) {
        this.id = id;
        this.operatingSystem = operatingSystem;
        this.socketMounted = socketMounted;
        this.wasInternetWorking = wasInternetWorking;
        this.problemDescription = problemDescription;
        this.isSolved = isSolved;
        this.createdAt = createdAt;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOperatingSystem() {
        return operatingSystem;
    }

    public void setOperatingSystem(String operatingSystem) {
        this.operatingSystem = operatingSystem;
    }

    public boolean isSocketMounted() {
        return socketMounted;
    }

    public void setSocketMounted(boolean socketMounted) {
        this.socketMounted = socketMounted;
    }

    public boolean isWasInternetWorking() {
        return wasInternetWorking;
    }

    public void setWasInternetWorking(boolean wasInternetWorking) {
        this.wasInternetWorking = wasInternetWorking;
    }

    public String getProblemDescription() {
        return problemDescription;
    }

    public void setProblemDescription(String problemDescription) {
        this.problemDescription = problemDescription;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isSolved() {
        return isSolved;
    }

    public void setSolved(boolean solved) {
        isSolved = solved;
    }

    public UserData getUser() {
        return user;
    }

    public void setUser(UserData user) {
        this.user = user;
    }
}
