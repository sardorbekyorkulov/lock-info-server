package uz.company.auth.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtProvider {

    // Kalitni xavfsiz formatga o'tkazish uchun yordamchi metod
    private final String SECRET_STRING = "your_very_long_secret_key_for_lock_info_project";
    private final long EXPIRATION_TIME = 2 * 60 * 60 * 1000; // 2 hours

    private SecretKey getSigningKey() {
        // Stringni baytga o'girib, HMAC-SHA kalitiga aylantiramiz
        return Keys.hmacShaKeyFor(SECRET_STRING.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey()) // Algoritm avtomatik aniqlanadi
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            // Xatolikni konsolda ko'rish uchun (ixtiyoriy):
             System.out.println("Token xatosi: " + e.getMessage());
            return false;
        }
    }
}