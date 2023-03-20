package net.myproject.bugTracker.service;

import net.myproject.bugTracker.domain.Account;
import net.myproject.bugTracker.domain.Comment;
import net.myproject.bugTracker.domain.Project;
import net.myproject.bugTracker.dto.CommentDto;
import net.myproject.bugTracker.repo.CommentRepo;
import net.myproject.bugTracker.repo.ProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

@Service
public class CommentService {

    @Autowired
    private CommentRepo commentRepo;
    @Autowired
    private ProjectRepo projectRepo;
    public Comment save(CommentDto commentDto, Account account) {
        Comment comment = new Comment();

        Project project = projectRepo.getById(commentDto.getProject());
        comment.setId(commentDto.getId());
        comment.setProject(project);
        comment.setText(commentDto.getText());
        comment.setCreatedBy(account);
        if(comment.getId() == null){
            comment.setCreatedDate(LocalDateTime.now());
        }

        return commentRepo.save(comment);
    }

    public Set<Comment> getCommentsByProject(Long project) {
      Set<Comment> comments =  commentRepo.findByProject(project);
        return comments;
    }
}
