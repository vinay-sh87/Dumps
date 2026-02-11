package com.example.demo.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.antlr.v4.runtime.Token;
import org.aspectj.weaver.ast.Expr;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    private final String SECRET_KEY = "secret key";
    // token validity
    private final long EXPIRATION_TIME = 24 * 60 * 60 * 1000;

    // token generation
    public String generateToken(Long userId, String email, String role) {
        return Jwts.builder().setSubject(email) // create a token that belongs to this user
                .claim("userId", userId) // identity data
                .claim("role", role) // extra identity data
                .setIssuedAt(new Date()) // creation date
                .setExpiration(
                        new Date(System.currentTimeMillis() + EXPIRATION_TIME) // token expiry time
                ).signWith(SignatureAlgorithm.HS256, SECRET_KEY) // encrypt the secret key with this signature algorithm
                .compact(); // convert the whole thing into a string
    }


    private Claims getClaims(String token) {
        return Jwts.parser() // read this token
                .setSigningKey(SECRET_KEY) // only trust the tokens signed with this secret key
                .parseClaimsJws(token) // verify signature + expiry + structure
                .getBody();

    }

    // extracting email from the token
    public String extractEmail(String token) {
        return getClaims(token).getSubject(); // return the subject
    }

    // token validation
    public boolean isTokenValid(String token) {
        try {
            getClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
