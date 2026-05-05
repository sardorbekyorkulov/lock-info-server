# 🍔 FoodFlow Microservices

## 📖 Overview
FoodFlow — bu **toza microservice arxitektura** asosida qurilgan restoran buyurtma va to‘lov tizimi. Har bir servis mustaqil, o‘zining DB’siga ega va API Gateway orqali birlashadi. Telegram bot yoki frontend faqat Gateway bilan gaplashadi.

---

## 🏗️ Architecture
- **auth-service** → foydalanuvchi autentifikatsiya va avtorizatsiya
- **restaurant-service** → restoran profillari va joylashuvlar
- **menu-service** → taomlar, narxlar, menyu kategoriyalari
- **order-service** → buyurtmalar va statuslar
- **payment-service** → to‘lovlar va tranzaksiyalar
- **gateway-service** → API Gateway (routing, security, monitoring)
- **redis** → umumiy cache/session
- **postgresql** → har bir servis uchun alohida DB

---

## ⚙️ Tech Stack
- **Backend**: Spring Boot 3, Java 21
- **Database**: PostgreSQL 15 (har bir servis uchun alohida)
- **Cache**: Redis 7
- **Build**: Maven 3.9
- **Containerization**: Docker, Docker Compose
- **Gateway**: Spring Cloud Gateway

---

## 🚀 Run Locally
1. **Clone repository**
   ```bash
   git clone https://github.com/yourname/foodflow.git
   cd foodflow
   ```

2. **Build & Run**
   ```bash
   docker-compose up -d --build
   ```

3. **Check containers**
   ```bash
   docker ps
   ```

4. **Access services via Gateway**
    - Auth → `http://localhost:8080/auth/...`
    - Restaurant → `http://localhost:8080/restaurants/...`
    - Menu → `http://localhost:8080/menu/...`
    - Order → `http://localhost:8080/orders/...`
    - Payment → `http://localhost:8080/payments/...`

---

## 📂 Project Structure
```
auth-service/
restaurant-service/
menu-service/
order-service/
payment-service/
gateway-service/
docker-compose.yml
```

---

## 🧪 Testing
- Unit tests → `mvn test`
- Integration tests → run via Docker Compose

---

## 🔒 Security
- JWT-based authentication (auth-service)
- Gateway handles authentication & authorization
- Rate limiting & monitoring via Spring Cloud Gateway

---

## ✅ Senior Notes
- Har bir servis mustaqil DB bilan ishlaydi.
- API orqali bog‘lanish (DB-level foreign key yo‘q).
- Gateway — yagona kirish nuqtasi.
- CI/CD pipeline qo‘shish tavsiya etiladi (GitHub Actions yoki GitLab CI).

---