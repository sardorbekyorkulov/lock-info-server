package uz.company.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.company.auth.entity.User;

import java.time.LocalDateTime;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByLogin(String login);
    Optional<User> findByEmail(String email);
    // For the Midnight Cleanup Task
    void deleteByEnabledFalseAndCreatedAtBefore(LocalDateTime dateTime);
}
