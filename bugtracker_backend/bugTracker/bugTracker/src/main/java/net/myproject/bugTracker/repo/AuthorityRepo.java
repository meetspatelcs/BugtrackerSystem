package net.myproject.bugTracker.repo;

import net.myproject.bugTracker.domain.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepo extends JpaRepository<Authority, Long> {
}
