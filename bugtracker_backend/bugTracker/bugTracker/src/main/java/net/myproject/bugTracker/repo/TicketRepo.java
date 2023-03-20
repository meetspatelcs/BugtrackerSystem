package net.myproject.bugTracker.repo;

import net.myproject.bugTracker.domain.Project;
import net.myproject.bugTracker.domain.Ticket;
import net.myproject.bugTracker.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface TicketRepo extends JpaRepository<Ticket, Long> {


    Set<Ticket> findByAccount(Account acc);

    @Query("SELECT a FROM Ticket a WHERE a.status = 'In-Progress' and a.project = ?1")
    Set<Ticket> findTicketsStatusByProject(Project projectId);

    Set<Ticket> findTicketsByProject(Project projectId);
}
