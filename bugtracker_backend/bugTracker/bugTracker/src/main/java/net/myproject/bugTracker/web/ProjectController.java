package net.myproject.bugTracker.web;

import net.myproject.bugTracker.domain.Account;
import net.myproject.bugTracker.domain.Project;
import net.myproject.bugTracker.domain.User;
import net.myproject.bugTracker.service.ProjectService;
import net.myproject.bugTracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    // ********************************************* start of GetMapping ********************************************* //

    // ***** allows admin to see all the projects exists in the database ***** //

    @GetMapping("/admin/projectsAuth")
    public ResponseEntity<?> getAllProjectsByAdmin(@AuthenticationPrincipal Account account){
        List<Project> allProjects = projectService.findAll(account);
        return ResponseEntity.ok(allProjects);
    }

    // ***** allows a user to get its created projects ***** //

    @GetMapping("")
    public ResponseEntity<?> getProjects(@AuthenticationPrincipal Account account){
        Set<Project> projectsByAccount = projectService.findByAccount(account);
        return ResponseEntity.ok(projectsByAccount);
    }

    // ***** with path var allows a user to get project details ***** //

    @GetMapping("{projectId}")
    public ResponseEntity<?> getProject(@PathVariable Long projectId, @AuthenticationPrincipal Account account){
        Optional<Project> projectOpt = projectService.findById(projectId);
        return ResponseEntity.ok(projectOpt.orElse(new Project()));
    }

    // ***** with path var allows a user to get all assigned users ***** //

    @GetMapping("/{projectId}/users")
    public ResponseEntity<?> getAllUserByProjectId(@PathVariable(value="projectId") Long projectId){
        List<User> users = userService.findUsersByAssignedProjectsId(projectId);
        return  ResponseEntity.ok(users);
    }

    // ********************************************* start of PostMapping ********************************************* //

    // ***** allows admin/lead to create a project ***** //

    @PostMapping("")
    public ResponseEntity<?> createProject(@AuthenticationPrincipal Account account){
        Project newProject = projectService.save(account);
        return ResponseEntity.ok(newProject);
    }

    // ***** with path var allows a user to edit project details ***** //

    @PutMapping("{projectId}")
    public ResponseEntity<?> updateProject(@PathVariable Long projectId, @RequestBody Project project, @AuthenticationPrincipal Account account) {
        Project updatedProject = projectService.save(project);
        return ResponseEntity.ok(updatedProject);
    }

    // ********************************************* start of PutMapping ********************************************* //

    // ***** with path var allows admin/lead to assign an employee to project ***** //

    @PutMapping("/{projectId}/users/{userId}")
    public ResponseEntity<?> assignEmployeeToProject(@PathVariable Long projectId, @PathVariable Long userId){
        Project project = projectService.findById(projectId).get();
        User user = userService.findById(userId).get();
        project.assignEmployee(user);
        Project assigningEmployee = projectService.save(project);
        return ResponseEntity.ok(assigningEmployee);
    }

    // ********************************************* start of DeleteMapping ********************************************* //

    @DeleteMapping("{projectId}")
    public ResponseEntity<?> deleteTicket(@PathVariable Long projectId){
        try{
            projectService.delete(projectId);
            return ResponseEntity.ok("Project has been deleted!");
        }
        catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("{projectId}/users/{userId}")
    public ResponseEntity<?> removeAssignedEmployeeFromTeam(@PathVariable Long projectId, @PathVariable Long userId){
        try{
            Optional<Project> project = projectService.findById(projectId);
            Project validatedProject = project.orElseThrow(() -> new NoSuchElementException("Not Found project with id: " + projectId));
            validatedProject.removeEmployee(userId);
            projectService.save(validatedProject);
            return ResponseEntity.ok("Employee has been removed!");
        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
