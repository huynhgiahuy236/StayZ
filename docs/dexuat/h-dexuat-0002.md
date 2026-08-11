# Mã Đề Xuất: dexuat-0002
**Dự án**: StayZ platform Microservices Architecture Migration
**Tiêu đề**: Bản Đánh Giá Hiện Trạng & Kế Hoạch Chuẩn Hóa Kiến Trúc API Gateway & Microservices Cho System HuKi Travel v2.0
**Trạng thái**: ĐANG CHỜ THỐNG NHẤT (PROPOSAL PENDING APPROVAL ⏳)

---

## ⚙️ 1. ĐÁNH GIÁ TÌNH TRẠNG MICROSERVICES & ĐỀ XUẤT CHUẨN HÓA DÀI HẠN

### 🔍 A. Đánh Giá Hiện Trạng Dự Án `platform/`:
- **Trạng thái hiện tại**: **Modular Monolith Architecture** (Kiến trúc Đơn khối dạng Module hóa sạch).
- **Những gì ĐÃ ĐẠT ĐƯỢC**:
  - Tất cả các phân hệ dịch vụ (`auth`, `users`, `properties`, `trips`, `bus`, `rides`, `splitbill`, `payment`) đã được tách thành các Routes, Controllers, Models riêng biệt chuẩn hóa.
- **Những gì CHƯA CHUẨN HÓA Microservices (Theo Báo cáo Master Spec v2.0)**:
  - Các module hiện chạy chung trong **1 Node.js Process** (`platform/server.js`) trên Port `4000`.
  - Chưa tách thành các dịch vụ độc lập có Port/Process riêng (ví dụ `huki-auth-service`: `4001`, `huki-stay-service`: `4002`, `huki-bus-service`: `4003`...).
  - Giao tiếp giữa các dịch vụ hiện là local function/route call, chưa qua **gRPC** (giao tiếp đồng bộ tốc độ cao) hay **RabbitMQ** (giao tiếp bất đồng bộ Event-Driven).

---

### 🚀 B. Lộ Trình 2 Bước Chuyển Đổi Sang Microservices Tối Ưu:

#### 🔹 Bước 1: Chuẩn Hóa API Gateway & Tách Port Dịch Vụ (Express Microservices)
- Xây dựng **API Gateway** tại `platform/src/gateway/` đóng vai trò duy nhất: Validate JWT SSO, Rate Limiting (Redis) và Proxy request sang các Microservices.
- Tách từng Controller/Router hiện tại thành các Express Microservices chạy độc lập trên Docker Containers.

#### 🔹 Bước 2: Nâng Cấp gRPC & RabbitMQ Message Broker (Theo chuẩn v2.0)
- Áp dụng **gRPC (Protocol Buffers)** cho giao tiếp đồng bộ giữa `huki-trip-service` và `huki-stay-service` / `huki-bus-service`.
- Áp dụng **RabbitMQ** cho việc bắn sự kiện bất đồng bộ (`PaymentCompletedEvent`, `HoldTimerExpiredEvent`, `NotificationSendEvent`).

---

> [!NOTE]
> **Quy định AGENTS.md (Rule 3 & Rule 4)**:
> - Đề xuất `dexuat-0002.md` tập trung hoàn toàn vào Kế hoạch Chuẩn hóa API Gateway & Microservices cho hệ thống.
> - Hệ thống hiện đang ở chế độ **`đề xuất`**, **CHƯA SỬA CODE** nguồn.
> - Bạn vui lòng xem qua file đề xuất mới này, nếu muốn tiến hành nâng cấp Microservices thì phát lệnh **`thống nhất - @Test/dexuat-0002.md`** nhé!
