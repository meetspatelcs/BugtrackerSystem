package net.myproject.bugTracker.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.*;

@Entity
public class Account implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idaccount;
    private String username; // email
    @JsonIgnore
    private String password;
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "acc")
    private Set<Authority> authorities = new HashSet<>();
    private LocalDateTime createdOn;
    private char isActive;

    @OneToOne(optional = false)
    private User user;



    public Long getIdaccount() {
        return idaccount;
    }

    public void setIdaccount(Long idaccount) {
        this.idaccount = idaccount;
    }

//    public String getEmailUser() {
//        return emailUser;
//    }
//
//    public void setEmailUser(String emailUser) {
//        this.emailUser = emailUser;
//    }


    //public String getPassowrd() {return password;}

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDateTime createdOn) {
        this.createdOn = createdOn;
    }

    public char getIsActive() {
        return isActive;
    }

    public void setIsActive(char isActive) {
        this.isActive = isActive;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return authorities;
    }
    private void setAuthorities(Set<Authority> authorities){
        this.authorities = authorities;
    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }
    public void setUsername(String username){
        this.username = username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
