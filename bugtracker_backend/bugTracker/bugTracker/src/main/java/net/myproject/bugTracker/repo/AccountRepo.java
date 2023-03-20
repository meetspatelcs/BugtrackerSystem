package net.myproject.bugTracker.repo;

import net.myproject.bugTracker.domain.Account;
import net.myproject.bugTracker.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AccountRepo extends JpaRepository<Account, Long> {

    Optional<Account> findByUsername(String username);

    @Query("SELECT a FROM Account a WHERE a.user = :user")
    Optional<Account> findByUser(User user);

}
