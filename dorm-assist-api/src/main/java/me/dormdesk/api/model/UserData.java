package me.dormdesk.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Component
@Entity
@Table(name = "users")
public class UserData implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "e-mail")
    private String email;

    private String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String roomNumber;
    private String role;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return true;
    }

    @JsonIgnore
    private List<GrantedAuthority> authorities;

    public UserData() {
    }

    public UserData(String email, String username, String password, String dormId) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.roomNumber = dormId;
    }

    public UserData(int id, String email, String username, String password, String dormId, LocalDateTime createdAt) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.roomNumber = dormId;
        this.createdAt = createdAt;
    }

    public UserData(int id, String email, String username, String password, String dormId, String role, LocalDateTime createdAt) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.roomNumber = dormId;
        this.role = role;
        this.createdAt = createdAt;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.role.toUpperCase())); // Prefix ROLE_
    }

    @Override
    public String toString() {
        return "UserData{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", dormId='" + roomNumber + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

//    public List<ExampleUsersData> getExampleUsersData() {
//        return exampleUsersData;
//    }
//
//    public void setExampleUsersData(List<ExampleUsersData> exampleUsersData) {
//        this.exampleUsersData = exampleUsersData;
//    }
}
