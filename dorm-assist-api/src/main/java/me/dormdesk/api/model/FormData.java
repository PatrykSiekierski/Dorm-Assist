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
    private String roomNumber;
    private String operatingSystem;
    private boolean isSocketMounted;
    private boolean wasInternetWorking;
    private String problemDescription;
    private boolean isSolved = false;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Override
    public String toString() {
        return "FormData{" +
                "roomNumber='" + roomNumber + '\'' +
                ", operatingSystem='" + operatingSystem + '\'' +
                ", isSocketMounted=" + isSocketMounted +
                ", wasInternetWorking=" + wasInternetWorking +
                ", problemDescription='" + problemDescription + '\'' +
                '}';
    }

    public FormData() {
    }

    public FormData(String roomNumber, String operatingSystem, boolean isSocketMounted, boolean wasInternetWorking, String problemDescription) {
        this.roomNumber = roomNumber;
        this.operatingSystem = operatingSystem;
        this.isSocketMounted = isSocketMounted;
        this.wasInternetWorking = wasInternetWorking;
        this.problemDescription = problemDescription;
    }

    public FormData(int id, String roomNumber, String operatingSystem, boolean isSocketMounted, boolean wasInternetWorking, String problemDescription) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.operatingSystem = operatingSystem;
        this.isSocketMounted = isSocketMounted;
        this.wasInternetWorking = wasInternetWorking;
        this.problemDescription = problemDescription;
    }

    public FormData(int id, String roomNumber, String operatingSystem, boolean isSocketMounted, boolean wasInternetWorking, String problemDescription, LocalDateTime createdAt) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.operatingSystem = operatingSystem;
        this.isSocketMounted = isSocketMounted;
        this.wasInternetWorking = wasInternetWorking;
        this.problemDescription = problemDescription;
        this.createdAt = createdAt;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getOperatingSystem() {
        return operatingSystem;
    }

    public void setOperatingSystem(String operatingSystem) {
        this.operatingSystem = operatingSystem;
    }

    public boolean isSocketMounted() {
        return isSocketMounted;
    }

    public void setSocketMounted(boolean socketMounted) {
        isSocketMounted = socketMounted;
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
}
