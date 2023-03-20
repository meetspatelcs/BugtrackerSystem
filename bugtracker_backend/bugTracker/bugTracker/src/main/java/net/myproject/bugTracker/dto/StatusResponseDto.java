package net.myproject.bugTracker.dto;

import net.myproject.bugTracker.domain.Ticket;
import net.myproject.bugTracker.enums.CategoryEnum;
import net.myproject.bugTracker.enums.PriorityEnum;
import net.myproject.bugTracker.enums.StatusEnum;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class StatusResponseDto {

    private Ticket ticket;
    private StatusEnum[] statusEnums = StatusEnum.values();
    private CategoryEnum[] categoryEnums = CategoryEnum.values();
    private PriorityEnum[] priorityEnums = PriorityEnum.values();

    public StatusResponseDto(Ticket ticket) {
        super();
        this.ticket = ticket;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    public StatusEnum[] getStatusEnums() {
        return statusEnums;
    }

    public CategoryEnum[] getCategoryEnums() {
        return categoryEnums;
    }

    public PriorityEnum[] getPriorityEnums() {
        return priorityEnums;
    }
}
