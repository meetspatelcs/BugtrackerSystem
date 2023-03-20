package net.myproject.bugTracker.repo;

import net.myproject.bugTracker.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepo extends JpaRepository<User, Long> {

    List<User> findUsersByAssignedProjectsId(Long projectId);


}
