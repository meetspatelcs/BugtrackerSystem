package net.myproject.bugTracker.service;

import net.myproject.bugTracker.domain.Account;
import net.myproject.bugTracker.domain.Authority;
import net.myproject.bugTracker.domain.User;
import net.myproject.bugTracker.dto.AccountDto;
import net.myproject.bugTracker.repo.AccountRepo;
import net.myproject.bugTracker.repo.AuthorityRepo;
import net.myproject.bugTracker.util.CustomPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    private AuthorityRepo authorityRepo;

    @Autowired
    private CustomPasswordEncoder customPasswordEncoder;
    public Account findByUser(User userId) throws Exception {
        Optional<Account> hasAcc = accountRepo.findByUser(userId);
        return hasAcc.orElseThrow(() ->  new Exception("Invalid"));
    }

    public void generateAccount(User user){
        if(user != null) {
            Account newAccount = new Account();
            String defaultCredentials = user.getEmployeeID().toString();
            newAccount.setUsername(defaultCredentials);
            String encodedPassword = customPasswordEncoder.getPasswordEncoder().encode(defaultCredentials);
            newAccount.setPassword(encodedPassword);
            newAccount.setUser(user);
            newAccount.setCreatedOn(LocalDateTime.now());
            accountRepo.save(newAccount);
            Authority authority = new Authority();
            authority.setAuthority("ROLE_USER");
            authority.setAcc(newAccount);
            authorityRepo.save(authority);
        }
        else
            return;
    }

    public void updatePassword(Account account, String newCred){

        String encodedPassword = customPasswordEncoder.getPasswordEncoder().encode(newCred);
        account.setPassword(encodedPassword);
        accountRepo.save(account);
    }

}
