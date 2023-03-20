package net.myproject.bugTracker.web;

import net.bytebuddy.asm.Advice;
import net.myproject.bugTracker.domain.Account;
//import net.myproject.bugTracker.domain.Project;
import net.myproject.bugTracker.domain.User;
//import net.myproject.bugTracker.service.ProjectService;
import net.myproject.bugTracker.service.AccountService;
import net.myproject.bugTracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AccountService accountService;


//    @Autowired
//    private ProjectService projectService;

    // ********************************************* start of GetMapping ********************************************* //

    // ***** allows admin to get all the list of users present in the database, including a user not having an account ***** //

    @GetMapping("")
    public ResponseEntity<?> getUsers(){

        List<User> usersById = userService.findAll();
        return ResponseEntity.ok(usersById);
    }

    // ***** allows a logged user to get its details ***** //

    @GetMapping("/myDetails")
    public ResponseEntity<?> getUserSelf(@AuthenticationPrincipal Account account){
        Optional<User> userById = userService.findById(account);
        return ResponseEntity.ok(userById);
    }

    // ***** with path var allows admin/lead to see details of a user ***** //

    @GetMapping("{userId}")
    public ResponseEntity<?> getUserWithId(@PathVariable Long userId){
        Optional<User> userById = userService.findById(userId);
        return ResponseEntity.ok(userById);
    }

    @GetMapping("/unassigned/{projectId}")
    public ResponseEntity<?> getUnassignedUsers(@PathVariable Long projectId){
        Set<User> unassignedUser = userService.getAllUnassignedUsers(projectId);
        return ResponseEntity.ok(unassignedUser);
    }

    // ***** allows an admin to determine if a user has an account or not ***** //

//    @GetMapping("{userId}/validateAccount")
//    public ResponseEntity<?> getAccountWithUserId(@PathVariable User userId){
//        Account hasAccount = userService.findByUser(userId);
//        return ResponseEntity.ok(hasAccount);
//    }

    // ********************************************* start of postMapping ********************************************* //

    // ***** allows admin to create a user in the database ***** //

    @PostMapping("")
    public ResponseEntity<?> createUser(@AuthenticationPrincipal Account account){
        User newUser = userService.save(account);
        accountService.generateAccount(newUser);

        return ResponseEntity.ok(newUser);
    }

    // ********************************************* start of PutMapping ********************************************* //

    // ***** with path var allows admin to update details of a user ***** //

    @PutMapping("{userId}")
    public ResponseEntity<?> updateUserWithId(@PathVariable Long userId, @RequestBody User user){
        User updateEmployee = userService.save(user);
        return ResponseEntity.ok(updateEmployee);
    }

}
