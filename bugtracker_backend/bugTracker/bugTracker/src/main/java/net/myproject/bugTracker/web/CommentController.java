package net.myproject.bugTracker.web;

import net.myproject.bugTracker.domain.Account;
import net.myproject.bugTracker.domain.Comment;
import net.myproject.bugTracker.dto.CommentDto;
import net.myproject.bugTracker.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


import java.util.Set;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("")
    public ResponseEntity<?> createComment(@RequestBody CommentDto commentDto, @AuthenticationPrincipal Account account){
       Comment comment = commentService.save(commentDto, account);

        return ResponseEntity.ok(comment);
    }

    @PutMapping("{commentId}")
    public ResponseEntity<?> updateComment(@RequestBody CommentDto commentDto, @AuthenticationPrincipal Account account){
        Comment comment = commentService.save(commentDto, account);

        return ResponseEntity.ok(comment);
    }

    @GetMapping("")
    public ResponseEntity<?> getCommentsByAssignment(@RequestParam Long project){
        Set<Comment> comments = commentService.getCommentsByProject(project);
        return ResponseEntity.ok(comments);
    }
}
