package net.myproject.bugTracker.service;

import net.myproject.bugTracker.domain.Account;
import net.myproject.bugTracker.domain.Project;
import net.myproject.bugTracker.enums.AuthorityEnum;
import net.myproject.bugTracker.repo.ProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepo projectRepo;

    public Project save(Account account){
        Project project = new Project();
        project.setAccount(account);
        project.setProjectCreated(LocalDateTime.now());

        return projectRepo.save(project);
    }

    public Set<Project> findByAccount(Account account){
        // gets project of user from assigned employee table
        boolean hasUserRole = account.getAuthorities().stream().filter(auth -> AuthorityEnum.ROLE_USER.name().equals(auth.getAuthority())).count() > 0;

        if(hasUserRole){
            Long userAccID = account.getUser().getId();
            return projectRepo.findProjectsByAssignedEmployeeId(userAccID);
        }
        else{
            return projectRepo.findByAccount(account);
        }
    }

    public Optional<Project> findById(Long projectId) {
        return projectRepo.findById(projectId);
    }

    public Project save(Project project) {
        return projectRepo.save(project);
    }

    public List<Project> findAll(Account account){
        boolean hasAdminRole = account.getAuthorities().stream().filter(auth -> AuthorityEnum.ROLE_ADMIN.name().equals(auth.getAuthority())).count() > 0;

        if(hasAdminRole){
            return  projectRepo.findAll();
        }
        else {
            return null;
        }
    }

    public void delete(Long projectId) {
        projectRepo.deleteById(projectId);
    }
}
