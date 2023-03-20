package net.myproject.bugTracker.web;

import io.jsonwebtoken.ExpiredJwtException;
import net.myproject.bugTracker.domain.Account;
import net.myproject.bugTracker.dto.AuthCredentialsRequest;
import net.myproject.bugTracker.dto.OldCredentialRequest;
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

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("login")
    public ResponseEntity<?> login (@RequestBody AuthCredentialsRequest request){
        try{
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

            Account acc = (Account) authenticate.getPrincipal();
            // in body send details from user and Account
            acc.setPassword(null);

            return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, jwtUtil.generateToken(acc)).body(acc);
        }
        catch(BadCredentialsException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestParam String token, @AuthenticationPrincipal Account account){
       try{
           Boolean isTokenValid = jwtUtil.validateToken(token, account);

           return ResponseEntity.ok(isTokenValid);
       }
        catch (ExpiredJwtException e){
            return ResponseEntity.ok(false);
        }
    }


}
