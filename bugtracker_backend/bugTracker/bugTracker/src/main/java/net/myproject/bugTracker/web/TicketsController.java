package net.myproject.bugTracker.web;

import net.myproject.bugTracker.domain.Account;
import net.myproject.bugTracker.domain.Project;
import net.myproject.bugTracker.domain.Ticket;


import net.myproject.bugTracker.dto.StatusResponseDto;
import net.myproject.bugTracker.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/tickets")
public class TicketsController {

    @Autowired
    private TicketService ticketService;

    // ********************************************* start of GetMapping ********************************************* //

    // ***** with path var allows a user to get details of a ticket ***** //

    @GetMapping("{ticketId}")
    public ResponseEntity<?> getTicket(@PathVariable Long ticketId, @AuthenticationPrincipal Account acc){
        Optional<Ticket> ticketOpt = ticketService.findById(ticketId);
        StatusResponseDto responseDto = new StatusResponseDto(ticketOpt.orElse(new Ticket()));
        return ResponseEntity.ok(responseDto);
    }

    // ***** with path var allows a user to get all tickets of a project in status of IN_PROGRESS ***** //

    @GetMapping("/projects/{projectId}/ticket")
    public ResponseEntity<?> getTicketsStatusByProjects(@PathVariable Project projectId){
        Set<Ticket> ticketsByProjects = ticketService.findTicketsStatusByProject(projectId);
        return ResponseEntity.ok(ticketsByProjects);
    }

    // ***** allows a user to get all tickets created by the user ***** //

    @GetMapping("/myTickets")
    public ResponseEntity<?> getTicketsByUser(@AuthenticationPrincipal Account account){
        Set<Ticket> ticketsByUser = ticketService.findByAccount(account);
        return ResponseEntity.ok(ticketsByUser);
    }

    // ***** allows admin/lead to get all tickets of a particular project ***** //

    @GetMapping("/projects/{projectId}/projectTickets")
    public ResponseEntity<?> getTicketsByProjects(@PathVariable Project projectId){
        Set<Ticket> ticketsByProjects = ticketService.findTicketsByProject(projectId);
        return ResponseEntity.ok(ticketsByProjects);
    }

    // ********************************************* start of PostMapping ********************************************* //

    // ***** with path var allows a user to create a ticket ***** //

    @PostMapping("/projects/{projectId}/ticket")
    public ResponseEntity<?> addTicket(@PathVariable Project projectId, @AuthenticationPrincipal Account account){
        Ticket newTicket = ticketService.save(projectId, account);
        return ResponseEntity.ok(newTicket);
    }

    // ********************************************* start of PutMapping ********************************************* //

    // ***** with path var allows a user to edit the ticket ***** //

    @PutMapping("{ticketId}")
    public ResponseEntity<?> updateTicket(@PathVariable Long ticketId, @RequestBody Ticket ticket, @AuthenticationPrincipal Account acc) {
        Ticket updatedTicket = ticketService.save(ticket);
        return ResponseEntity.ok(updatedTicket);
    }

    // ********************************************* start of DeleteMapping ********************************************* //

    @DeleteMapping("{ticketId}")
    public ResponseEntity<?> deleteTicket(@PathVariable Long ticketId){
        try{
            ticketService.delete(ticketId);
            return ResponseEntity.ok("Ticket has been deleted!");
        }
        catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
