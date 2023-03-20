package net.myproject.bugTracker.dto;

public class CommentDto {


    private Long id;
    private Long project;
    private String text;
    private String user;

    public Long getProject() {
        return project;
    }

    public void setProject(Long project) {
        this.project = project;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "CommentDto{" +
                "project=" + project +
                ", text='" + text + '\'' +
                ", user='" + user + '\'' +
                '}';
    }
}
