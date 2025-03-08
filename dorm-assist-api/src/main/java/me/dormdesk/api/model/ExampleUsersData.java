package me.dormdesk.api.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
@Entity
@Table(name = "example_users")
public class ExampleUsersData {

    @Id
    @GeneratedValue
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserData user;

    @Column(name = "e-mail")
    private String email;

    private String username;
    private String roomNumber;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    public ExampleUsersData() {
    }

    public ExampleUsersData(UserData user, String email, String username, String roomNumber) {
        this.user = user;
        this.email = email;
        this.username = username;
        this.roomNumber = roomNumber;
    }

    public ExampleUsersData(int id, UserData user, String email, String username, String roomNumber, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.email = email;
        this.username = username;
        this.roomNumber = roomNumber;
        this.createdAt = createdAt;
    }

    private static final List<String> names = List.of("Jan", "Maciej", "Adam", "Janusz", "Ignacy", "Sebastian", "Robert");
    private static final List<String> surnames = List.of("Gaborek", "Nowak", "Kowalski", "Duda", "Szymczak", "Stępień", "Krupa");
    private static final List<String> domain = List.of("gmail.com", "testmail.com", "example.com", "mail.com", "yah.com");
    private static final Random random = new Random();

    public static ExampleUsersData generateExampleUserData(UserData user){
        String username = generateUsername();
        String email = generateEmail(username);
        String roomNumber = generateRoomNumber();

        return new ExampleUsersData(user, email, username, roomNumber);
    }

    private static String generateUsername() {
        String randomName = names.get(random.nextInt(names.size())).toLowerCase();
        String randomSurname = surnames.get(random.nextInt(surnames.size())).toLowerCase();
        int randomInt = random.nextInt(2010);
        return randomName + randomSurname + randomInt;
    }

    private static String generateEmail(String username) {
        String randomDomain = domain.get(random.nextInt(domain.size()));
        return username + "@" + randomDomain;
    }

    private static String generateRoomNumber() {
        int randomRoomNumber = random.nextInt(3) * 100 + random.nextInt(21);
        if (random.nextInt(2) == 1) return randomRoomNumber + "a";
        return randomRoomNumber + "b";
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public UserData getUser() {
        return user;
    }

    public void setUser(UserData user) {
        this.user = user;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
