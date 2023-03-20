package net.myproject.bugTracker.filter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;

import net.myproject.bugTracker.domain.Account;
import net.myproject.bugTracker.repo.AccountRepo;
import net.myproject.bugTracker.util.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@Component
public class JWTFilter extends OncePerRequestFilter {

    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    private JWTUtil jwtUtil;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {

        // gets authorization header and validate
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if(!StringUtils.hasText(header) || StringUtils.hasText(header) && !header.startsWith("Bearer ")){
            chain.doFilter(request, response);
            return;
        }

        // Authorization -> [Bearer], [asdf.2en4vrrtv.rtv4v3tv.vet4]
        final String token = header.split(" ")[1].trim();

        //gets Account identity and set it on the spring security context
        UserDetails userDetails = accountRepo.findByUsername(jwtUtil.getUsernameFromToken(token)).orElse(null);

        // gets jwt token and validate
        if(!jwtUtil.validateToken(token, userDetails)){
            chain.doFilter(request, response);
            return;
        }

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null,
                userDetails == null ? List.of() : userDetails.getAuthorities());
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        // this is where the authentication occurs
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        chain.doFilter(request, response);

        // ************************************************************************************************************ //

//        if(request.getCookies() == null){
//            chain.doFilter(request, response);
//            return;
//        }
//
//        //Get authorization header and validate
//        Optional<Cookie> jwtOpt = Arrays.stream(request.getCookies()).filter(cookie -> "jwt".equals(cookie.getName())).findAny();
//        if(jwtOpt.isEmpty()){
//            chain.doFilter(request, response);
//            return;
//        }
//
//        String token = jwtOpt.get().getValue();
//        UserDetails userDetails = null;
//        try {
//            Optional<Account> appAccountOpt = accountRepo.findByUsername(jwtUtil.getUsernameFromToken(token));
//            userDetails = adminAccountRepo.findByUsername(jwtUtil.getUsernameFromToken(token)).map(adminAccount -> new Account(adminAccount, appAccountOpt)).orElse(null);
//        }
//        catch (ExpiredJwtException | SignatureException e){
//            chain.doFilter(request, response);
//            return;
//        }
//
//        // Gets a jwt token and validate
//        if(!jwtUtil.validateToken(token, userDetails)){
//            chain.doFilter(request, response);
//            return;
//        }
//
//        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails,
//                null, userDetails == null ? List.of() : userDetails.getAuthorities());
//
//        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//
//        // where the user gets a validations, or user is valid
//        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//
//        chain.doFilter(request, response);
    }
}
