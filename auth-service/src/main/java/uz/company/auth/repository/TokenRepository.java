package uz.company.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.company.auth.entity.VerificationToken;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<VerificationToken, Long> {
    Optional<VerificationToken> findByToken(String token);
}