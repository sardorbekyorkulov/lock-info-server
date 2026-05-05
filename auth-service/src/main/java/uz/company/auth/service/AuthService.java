package uz.company.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.company.auth.dto.LoginRequest;
import uz.company.auth.dto.RegisterRequest;
import uz.company.auth.entity.User;
import uz.company.auth.entity.VerificationToken;
import uz.company.auth.repository.TokenRepository;
import uz.company.auth.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor // Lombok creates constructor for all final fields (Better than @Autowired)
public class AuthService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final JwtProvider jwtProvider;

    @Transactional
    public String register(RegisterRequest request) {
        // 1. Validation: Check if the login or email is already in use
        if (userRepository.findByLogin(request.getLogin()).isPresent()) {
            throw new RuntimeException("Username Allaqachon ishlatilgan!");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email Allaqachon ishlatilgan!");
        }

        // 2. Create the User Entity
        // We keep enabled = false because they must click the email link first
        User user = new User();
        user.setLogin(request.getLogin());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // BCrypt Hashing
        user.setEnabled(false);
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);

        // 3. Create the Verification Token
        // The constructor we wrote earlier automatically sets expiryDate to +10 minutes
        String tokenValue = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken(tokenValue, user);
        tokenRepository.save(verificationToken);

        // 4. Prepare and Send the Activation Email
        // We point the link to the Gateway (port 8080) so it can route to the Auth service
        String activationLink = "http://localhost:8080/api/auth/activate?token=" + tokenValue;

        emailService.sendActivationEmail(
                user.getEmail(),
                activationLink
        );

        return "Registration successful! Please check your email to activate your account within 10 minutes.";
    }
    @Transactional
    public String activate(String tokenValue) {
        VerificationToken token = tokenRepository.findByToken(tokenValue)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        // Task Requirement: Check if 10 minutes passed
        if (token.getExpiryDate().isBefore(LocalDateTime.now())) {
            // Cleanup: remove the unactivated user so they can try again
            userRepository.delete(token.getUser());
            return "Link expired. Please register again.";
        }

        User user = token.getUser();
        user.setEnabled(true);
        userRepository.save(user);
        tokenRepository.delete(token); // Delete token after use

        return "Account activated! You can now login.";
    }

    public String login(LoginRequest request) {
        // 1. Foydalanuvchini bazadan qidirish
        User user = userRepository.findByLogin(request.getLogin())
                .orElseThrow(() -> new RuntimeException("Foydalanuvchi topilmadi"));

        // 2. Parolni tekshirish (BCrypt ishlatayotgan bo'lsangiz)
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Parol noto'g'ri");
        }

        // 3. Aktivatsiyani tekshirish
        if (!user.isEnabled()) {
            throw new RuntimeException("Profil faollashtirilmagan");
        }

        // 4. JWT Token yaratish va qaytarish
        return jwtProvider.generateToken(user.getLogin());
    }
}