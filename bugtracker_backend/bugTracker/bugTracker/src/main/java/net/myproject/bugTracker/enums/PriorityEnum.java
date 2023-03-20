package net.myproject.bugTracker.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum PriorityEnum {
//    PRIORITY_0(0, "Select Priority"),
    PRIORITY_1(1, "Low"),
    PRIORITY_2(2, "Medium"),
    PRIORITY_3(3, "High"),
    ;


    private Integer priorityNum;
    private String priorityName;

    PriorityEnum(Integer priorityNum, String priorityName){
        this.priorityNum = priorityNum;
        this.priorityName = priorityName;
    }

    public Integer getPriorityNum() {
        return priorityNum;
    }

    public String getPriorityName() {
        return priorityName;
    }
}
