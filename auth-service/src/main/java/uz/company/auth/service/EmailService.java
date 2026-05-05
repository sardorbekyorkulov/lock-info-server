package uz.company.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // application.properties dagi it@artstation.uz ni avtomatik oladi
    @Value("${spring.mail.username}")
    private String senderEmail;

    @Async
    public void sendActivationEmail(String to, String activationLink) {
        SimpleMailMessage message = new SimpleMailMessage();

        // MUHIM: Bu yerda aynan o'zingizning korporativ pochtangiz bo'lishi shart
        message.setFrom(senderEmail);
        message.setTo(to);
        message.setSubject("Lock Info - Activate Your Account");
        message.setText("Welcome! Please click the link below to activate your account. " +
                "Note: This link expires in 10 minutes.\n\n" + activationLink);

        mailSender.send(message);
    }
}