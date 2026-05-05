package uz.company.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LoginRequest {

    @NotBlank(message = "Login bo'sh bo'lmasligi kerak")
    @Size(min = 4, max = 20, message = "Login 4 tadan 20 tagacha belgidan iborat bo'lishi kerak")
    private String username;

    @NotBlank(message = "Parol bo'sh bo'lmasligi kerak")
    @Size(min = 6, message = "Parol kamida 6 ta belgidan iborat bo'lishi kerak")
    private String password;

    // Getters and Setters...
}