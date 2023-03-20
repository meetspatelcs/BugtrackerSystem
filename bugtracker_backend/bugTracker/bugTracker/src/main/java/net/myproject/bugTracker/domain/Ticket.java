package net.myproject.bugTracker.domain;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Ticket {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    private Integer statusNum;
    private String title;
    private String description;
    private String status;
    private String priority;
    private String category;
    private LocalDateTime createdOn;
    private LocalDateTime resolvedOn;
    @ManyToOne(optional = false)
    private Account account; // author
    @ManyToOne(optional = false)
    private Project project; // ref to project

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

//    public Integer getStatusNum() {
//        return statusNum;
//    }
//
//    public void setStatusNum(Integer statusNum) {
//        this.statusNum = statusNum;
//    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDateTime getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(LocalDateTime createdOn) {
        this.createdOn = createdOn;
    }

    public LocalDateTime getResolvedOn() {
        return resolvedOn;
    }

    public void setResolvedOn(LocalDateTime resolvedOn) {
        this.resolvedOn = resolvedOn;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
