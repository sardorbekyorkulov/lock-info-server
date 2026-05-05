package uz.company.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.company.auth.repository.UserRepository;

import java.time.LocalDateTime;

@Service
@EnableScheduling
public class CleanupService {

    @Autowired
    private UserRepository userRepository;

    // Cron expression for 00:00 every day
    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void removeInactiveUsers() {
        // Find users created more than 1 hour ago who are still NOT enabled
        LocalDateTime cutoff = LocalDateTime.now().minusHours(1);
        userRepository.deleteByEnabledFalseAndCreatedAtBefore(cutoff);
        System.out.println("Midnight cleanup complete: Unactivated accounts removed.");
    }
}