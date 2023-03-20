package net.myproject.bugTracker.dto;

public class StatusEnumDto {

    private Integer statusNum;
    private String statusName;

    public StatusEnumDto(Integer statusNum, String statusName) {
        super();
        this.statusNum = statusNum;
        this.statusName = statusName;
    }

    public Integer getStatusNum() {
        return statusNum;
    }

    public void setStatusNum(Integer statusNum) {
        this.statusNum = statusNum;
    }

    public String getStatusName() {
        return statusName;
    }

    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }
}
