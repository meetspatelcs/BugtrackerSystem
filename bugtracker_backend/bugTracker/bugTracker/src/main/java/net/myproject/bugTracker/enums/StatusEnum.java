package net.myproject.bugTracker.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum StatusEnum {
//    STATUS_0(0, "Select Status"),
    STATUS_1(1, "New"),
    STATUS_2(2, "Open"),
        STATUS_3(3, "In-Progress"),
    STATUS_4(4, "Closed"),
    STATUS_5(5, "Resolved"),
    ;

    private Integer statusNum;
    private String statusName;

    StatusEnum(int statusNum, String statusName){
        this.statusNum = statusNum;
        this.statusName = statusName;
    }

    public Integer getStatusNum() {
        return statusNum;
    }

    public String getStatusName() {
        return statusName;
    }
}
