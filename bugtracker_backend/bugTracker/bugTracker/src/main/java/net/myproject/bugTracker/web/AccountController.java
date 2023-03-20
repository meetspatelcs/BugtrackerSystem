package net.myproject.bugTracker.web;

import net.myproject.bugTracker.domain.Account;
import net.myproject.bugTracker.domain.User;
import net.myproject.bugTracker.dto.AccountDto;
import net.myproject.bugTracker.dto.OldCredentialRequest;
import net.myproject.bugTracker.service.AccountService;
import net.myproject.bugTracker.util.JWTUtil;
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

import javax.security.auth.login.AccountNotFoundException;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTUtil jwtUtil;

    // ***** with path var allows admin to determine if user has an account ***** //

    @GetMapping("/validateAccount/{userId}")
    public ResponseEntity<?> validateUserHasAccount(@PathVariable User userId) throws Exception {
        Account hasAccount = accountService.findByUser(userId);
        return ResponseEntity.ok(hasAccount);
    }

//    @PostMapping("/signup")
//    public ResponseEntity<?> createAccount(@RequestBody AccountDto accountDto){
//        accountService.createAccount(accountDto);
//
//        try{
//            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(accountDto.getUsername(), accountDto.getPassword()));
//
//            Account account = (Account) authenticate.getPrincipal();
//            account.setPassword(null);
//
//            return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, jwtUtil.generateToken(account)).body(account);
//        }
//        catch (BadCredentialsException ex){
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//
//    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> updatePassword(@AuthenticationPrincipal Account account, @RequestBody OldCredentialRequest request){
         try{
             Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(account.getUsername(), request.getOldPassword()));

             Account myAccount = (Account) authenticate.getPrincipal();
             accountService.updatePassword(myAccount, request.getPassword());

             account.setPassword(null);

             return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION).body(account);
         }
         catch (BadCredentialsException ex){
             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
         }
    }
}
