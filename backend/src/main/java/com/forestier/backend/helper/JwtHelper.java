package com.forestier.backend.helper;

import com.forestier.backend.dto.UserDto;
import com.forestier.backend.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;

import java.nio.file.AccessDeniedException;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

public class JwtHelper {
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final int MINUTES = 60;

    public static String generateToken(UserDto dto) {
        var now = Instant.now();
        return Jwts.builder()
                .claim("userId", dto.getId())
                .claim("email", dto.getEmail())
                .claim("username", dto.getUsername())
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(MINUTES, ChronoUnit.MINUTES)))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();

    }


    public static String extractEmail(String token) throws AccessDeniedException {
        return getTokenBody(token).get("email", String.class);
    }

    public static String extractUsername(String token) throws AccessDeniedException {
        return getTokenBody(token).get("username", String.class);
    }

    public static UUID extractUserId(String token) throws AccessDeniedException {
        return UUID.fromString(getTokenBody(token).get("userId", String.class));
    }

    public static Boolean validateToken(String token, UserDetails userDetails) throws AccessDeniedException {
        final String username = extractEmail(token); // Email is used as username
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private static Claims getTokenBody(String token) throws AccessDeniedException {
        try {
            return Jwts
                    .parser()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (ExpiredJwtException e) { // Invalid signature or expired token
            throw new AccessDeniedException("Access denied: " + e.getMessage());
        }
    }

    private static boolean isTokenExpired(String token) throws AccessDeniedException {
        Claims claims = getTokenBody(token);
        return claims.getExpiration().before(new Date());
    }

    public static User getUserFromToken(String token) {
        try {
            token = token.substring(7);
            User user = new User();
            user.setEmail(JwtHelper.extractEmail(token));
            user.setId(JwtHelper.extractUserId(token));
            user.setUsername(JwtHelper.extractUsername(token));
            return user;
        }catch (Exception e) {
            throw new IllegalArgumentException("Invalid token");
        }
    }
}
