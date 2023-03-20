package net.myproject.bugTracker.service;

import net.myproject.bugTracker.domain.Account;
import net.myproject.bugTracker.domain.Project;
import net.myproject.bugTracker.domain.Ticket;
import net.myproject.bugTracker.enums.AuthorityEnum;
import net.myproject.bugTracker.repo.TicketRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

@Service
public class TicketService {

    @Autowired
    private TicketRepo ticketRepo;
    public Ticket save(Project projectId, Account acc){
        Ticket ticket = new Ticket();
        ticket.setStatus("New");
        ticket.setAccount(acc);
        ticket.setCreatedOn(LocalDateTime.now());
        ticket.setProject(projectId);

       return ticketRepo.save(ticket);
    }

    // THIS FUNCTION NEED SOME WORK, PURPOSE OF THIS QUERY IS TO LOGGED USER MUST ABLE TO SEE THEIR CREATED TICKETS
    public Set<Ticket> findByAccount(Account acc){
//        boolean hasLeadRole = acc.getAuthorities().stream().filter(auth -> AuthorityEnum.ROLE_LEAD.name().equals(auth.getAuthority())).count() > 0;
//
//        if(hasLeadRole){
//            return ticketRepo.findByAccount(acc);
//        }
//        else {
//            return ticketRepo.findByAccount(acc);
//        }

        return ticketRepo.findByAccount(acc);
    }

    public Optional<Ticket> findById(Long ticketId) {

        return ticketRepo.findById(ticketId);
    }

    public Ticket save(Ticket ticket) {
       return ticketRepo.save(ticket);
    }

    public Set<Ticket> findTicketsByProject(Project projectId) {
        return ticketRepo.findTicketsByProject(projectId);
    }

    public Set<Ticket> findTicketsStatusByProject(Project projectId){
        return ticketRepo.findTicketsStatusByProject(projectId);
    }

    public void delete(Long ticketId) {
        ticketRepo.deleteById(ticketId);
    }
}
