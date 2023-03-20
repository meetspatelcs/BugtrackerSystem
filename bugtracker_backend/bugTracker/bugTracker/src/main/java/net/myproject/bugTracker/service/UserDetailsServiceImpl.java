package net.myproject.bugTracker.service;

import net.myproject.bugTracker.domain.Account;
import net.myproject.bugTracker.repo.AccountRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
//    @Autowired
//    private CustomPasswordEncoder passwordEncoder;

    @Autowired
    private AccountRepo accountRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       Optional<Account> accountOpt = accountRepo.findByUsername(username);

       return accountOpt.orElseThrow(() -> new UsernameNotFoundException("Invalid Credentials!"));
    }

}
