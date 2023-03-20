package net.myproject.bugTracker.repo;

import net.myproject.bugTracker.domain.Account;
import net.myproject.bugTracker.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;



import java.util.Set;

public interface ProjectRepo extends JpaRepository<Project, Long> {
    Set<Project> findByAccount(Account account);
    Set<Project> findProjectsByAssignedEmployeeId(Long assignedEmployee);
}
