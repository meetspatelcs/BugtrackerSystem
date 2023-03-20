package net.myproject.bugTracker.service;

import net.myproject.bugTracker.domain.Account;
import net.myproject.bugTracker.domain.User;
import net.myproject.bugTracker.enums.AuthorityEnum;
import net.myproject.bugTracker.repo.AccountRepo;
import net.myproject.bugTracker.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

//    @Autowired
//    private AccountRepo accountRepo;
//
//    @Autowired
//    private AccountService accountService;

//    @Autowired
//    private ProjectService projectService;

    // ***** allows admin to create a user ***** //
    public User save(Account account) {
        // validates person creating user is admin
        boolean hasAdminRole = account.getAuthorities().stream().filter(auth -> AuthorityEnum.ROLE_ADMIN.name().equals(auth.getAuthority())).count() > 0;

        // after validation, generates an employeeId and creates a user
        if(hasAdminRole){
            User employee = new User();

            long empId = generateEmployeeID();

            employee.setEmployeeID(empId);

            return userRepo.save(employee);
        }
        else {
            return null;
        }
    }

    public List<User> findAll() {
        return userRepo.findAll();
    }

    public Optional<User> findById(Account account) {
        Long userAccId = account.getUser().getId();
        return userRepo.findById(userAccId);
    }

    public Optional<User> findById(Long userId) {
        return userRepo.findById(userId);
    }

    public User save(User user){
        return userRepo.save(user);
    }

    public List<User> findUsersByAssignedProjectsId(Long projectId){
        return userRepo.findUsersByAssignedProjectsId(projectId);
    }

    private Long generateEmployeeID(){
        LocalDateTime localDateTime = LocalDateTime.now();
        ZonedDateTime zdt = ZonedDateTime.of(localDateTime, ZoneId.systemDefault());
        long myId = zdt.toInstant().toEpochMilli();

        return myId;
    }

    public Set<User> removeAssignedUsers(List<User> usersById) {
    return null;
    }

    public Set<User> getAllUnassignedUsers(Long projectId) {
        List<User> allUsers = findAll();
        List<User> myList = findUsersByAssignedProjectsId(projectId);

        Set<User> result = new HashSet<>();

        for(User user : allUsers){
            result.add(user);
        }

        if(myList.size() == 0 || myList == null)
            return result;

        for(User user: myList){
            if(result.contains(user))
                result.remove(user);
        }

        return result;
    }

    public void delete(Long employeeId) {
        userRepo.deleteById(employeeId);
    }
}
