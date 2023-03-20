package net.myproject.bugTracker.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum CategoryEnum {
//    CATEGORY_0(0, "Select Category"),
    CATEGORY_1(1, "Bug"),
    CATEGORY_2(2, "Error"),
    CATEGORY_3(3, "Issue"),
    CATEGORY_4(4, "Feature"),
    CATEGORY_5(5, "Other"),
    ;


    private Integer categoryNum;
    private String categoryName;

    CategoryEnum(Integer categoryNum, String categoryName){
        this.categoryNum = categoryNum;
        this.categoryName = categoryName;
    }

    public Integer getCategoryNum() {
        return categoryNum;
    }

    public String getCategoryName() {
        return categoryName;
    }
}
