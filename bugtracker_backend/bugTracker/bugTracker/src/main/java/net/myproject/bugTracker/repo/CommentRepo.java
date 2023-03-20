package net.myproject.bugTracker.repo;

import net.myproject.bugTracker.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface CommentRepo extends JpaRepository<Comment, Long> {

    @Query("SELECT c FROM Comment c WHERE c.project.id = :project")
    Set<Comment> findByProject(Long project);
}
