package me.dormdesk.api.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Random;

@Component
@Entity
@Table(name = "example_reports")
public class ExampleReportData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "example_user_id")
    private ExampleUsersData exampleUserData;

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

    public ExampleReportData(ExampleUsersData exampleUserData, String operatingSystem, boolean socketMounted, boolean wasInternetWorking, String problemDescription, boolean isSolved) {
        this.exampleUserData = exampleUserData;
        this.operatingSystem = operatingSystem;
        this.socketMounted = socketMounted;
        this.wasInternetWorking = wasInternetWorking;
        this.problemDescription = problemDescription;
        this.isSolved = isSolved;
    }

    public ExampleReportData(int id, ExampleUsersData exampleUserData, String operatingSystem, boolean socketMounted, boolean wasInternetWorking, String problemDescription, boolean isSolved, LocalDateTime createdAt) {
        this.id = id;
        this.exampleUserData = exampleUserData;
        this.operatingSystem = operatingSystem;
        this.socketMounted = socketMounted;
        this.wasInternetWorking = wasInternetWorking;
        this.problemDescription = problemDescription;
        this.isSolved = isSolved;
        this.createdAt = createdAt;
    }

    private static final Random random = new Random();

    public ExampleReportData generateRandomSampleReport(ExampleUsersData exampleUsersData) {
        String operatingSystem = getRandomOperatingSystem();
        boolean socketMounted = random.nextBoolean();
        boolean wasInternetWorking = random.nextBoolean();
        String problemDescription = generateRandomProblemDescription(socketMounted, wasInternetWorking);

        return new ExampleReportData(exampleUsersData, operatingSystem, socketMounted, wasInternetWorking, problemDescription, false);
    }

    private String getRandomOperatingSystem() {
        String system = switch (random.nextInt(3)) {
            case 0 -> "Windows";
            case 1 -> "Linux";
            case 2 -> "Mac";
            default -> "Windows";
        };
        return system;
    }

    private String generateRandomProblemDescription(boolean socketMounted, boolean wasInternetWorking) {
        if (!socketMounted && !wasInternetWorking) {
            return "Gniazdko jest zniszczone odkąd tu jestem.";
        } else if (socketMounted && !wasInternetWorking) {
            return "Nie mogę się połączyć z internetem, nawet po połączeniu kablem.";
        } else if (!socketMounted && wasInternetWorking) {
            return "Gniazdko zostało uszkodzone przy odłączaniu kabla internetowego.";
        } else if (socketMounted && wasInternetWorking) {
            return "Internet nagle przestał działać.";
        }

        return "";
    }

    @Override
    public String toString() {
        return "ExampleReportData{" +
                "id=" + id +
                ", exampleUserData=" + exampleUserData +
                ", operatingSystem='" + operatingSystem + '\'' +
                ", socketMounted=" + socketMounted +
                ", wasInternetWorking=" + wasInternetWorking +
                ", problemDescription='" + problemDescription + '\'' +
                ", isSolved=" + isSolved +
                ", createdAt=" + createdAt +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ExampleUsersData getExampleUserData() {
        return exampleUserData;
    }

    public void setExampleUserData(ExampleUsersData exampleUserData) {
        this.exampleUserData = exampleUserData;
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

    public boolean isSolved() {
        return isSolved;
    }

    public void setSolved(boolean solved) {
        isSolved = solved;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
