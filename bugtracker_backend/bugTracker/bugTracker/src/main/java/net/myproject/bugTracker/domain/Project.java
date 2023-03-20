package net.myproject.bugTracker.domain;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
public class Project {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String projectTitle;
    private String projectDescription;
    @ManyToOne(optional = false)
    private Account account; // author of project
    @ManyToMany
    @JoinTable(name = "assigned_employee", joinColumns = @JoinColumn(name = "project_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> assignedEmployee;
    private LocalDateTime projectCreated;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    public String getProjectDescription() {
        return projectDescription;
    }

    public void setProjectDescription(String projectDescription) {
        this.projectDescription = projectDescription;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Set<User> getAssignedEmployee() {
        return assignedEmployee;
    }

    public void setAssignedEmployee(Set<User> assignedEmployee) {
        this.assignedEmployee = assignedEmployee;
    }

    public LocalDateTime getProjectCreated() {
        return projectCreated;
    }

    public void setProjectCreated(LocalDateTime projectCreated) {
        this.projectCreated = projectCreated;
    }

    public void assignEmployee(User user) {
        assignedEmployee.add(user);
    }

    public void removeEmployee(Long userId){
        User user = this.assignedEmployee.stream().filter(emp -> emp.getId() == userId).findFirst().orElse(null);
        if(user != null){
            assignedEmployee.remove(user);
            user.getAssignedProjects().remove(this);
        }
    }
}
