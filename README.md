# 🛡️ Lock Info Server (Microservices Auth)

Ushbu loyiha Spring Boot va Spring Cloud texnologiyalari yordamida qurilgan mikroservisli autentifikatsiya tizimidir. Loyiha foydalanuvchilarni ro'yxatdan o'tkazish, email orqali faollashtirish va JWT token orqali login qilish imkoniyatlarini taqdim etadi.

## 🚀 Texnologiyalar Staki

*   **Backend:** Java 17, Spring Boot 3.x, Spring Security
*   **Microservices:** Spring Cloud Gateway (API Routing)
*   **Security:** JWT (JSON Web Token), BCrypt Password Encoding
*   **Database:** PostgreSQL
*   **DevOps:** Docker, Docker Compose
*   **Frontend:** React (Vite)

## 🏗️ Loyiha Strukturasi

Loyiha ikkita asosiy moduldan iborat:
1.  **Gateway Service (Port: 8090):** Barcha so'rovlarni qabul qiladi va kerakli servisga yo'naltiradi (Routing).
2.  **Auth Service (Port: 8091):** Login, Register va JWT generatsiyasi uchun javobgar servis.

## 🛠️ O'rnatish va Ishga tushirish

### 1. Repozitoriyani klonlash
```bash
git clone https://github.com/sardorbekyorkulov/lock-info-server.git
cd lock-info-server
```

### 2. Docker orqali ishga tushirish
Loyihani barcha bazalari va servislari bilan birga ishga tushirish uchun:
```bash
docker-compose up -d --build
```

### 3. Ma'lumotlar bazasi sozlamalari
`application.properties` faylida PostgreSQL ulanishlarini tekshiring:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/lock_info_db
spring.datasource.username=postgres
spring.datasource.password=your_password
```

## 🔐 API Endpoints (Gateway orqali)

| Metod | Endpoint | Tavsif |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Yangi foydalanuvchi yaratish |
| `POST` | `/api/auth/login` | Tizimga kirish va JWT olish |
| `GET` | `/api/auth/verify` | Emailni tasdiqlash |

## 🧪 Validatsiya va Xatoliklar
Tizimda **Global Exception Handler** mavjud bo'lib, barcha xatoliklar (noto'g'ri login/parol, band email) tushunarli JSON formatida qaytariladi.

## 👨‍💻 Muallif
**Sardorbek Yorqulov** — Backend muhandisi (Java/Spring Boot).

---
