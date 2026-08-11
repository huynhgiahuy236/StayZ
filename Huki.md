# 🚀 BẢN TỔNG QUAN TOÀN BỘ DỰ ÁN HUKI TRAVEL (MASTER PROJECT SPECIFICATION & ARCHITECTURE BLUEPRINT)

> **Tài liệu tổng hợp phục vụ Agent & Developers tra cứu toàn diện hiện trạng, kiến trúc, luồng chạy nghiệp vụ, tiến độ và định hướng nâng cấp của Hệ sinh thái Du lịch HuKi Travel.**
> **Tác giả**: Huỳnh Gia Huy (`Huy` - Prefix `h-`) & Lê Đức Kiên (`Kiên` - Prefix `k-`) | **HK Team**
> **Phiên bản Master**: v2.0.0 | **Ngày cập nhật**: 11/08/2026

*Lưu ý: File gốc đầy đủ chi tiết được lưu trữ và cập nhật liên tục tại [docs/Huki.md](docs/Huki.md).*

---

## 🏛️ 1. TỔNG QUAN THƯƠNG HIỆU & ĐỊNH VỊ DỰ ÁN (BRAND & ECOSYSTEM OVERVIEW)

- **Tên dự án**: **HuKi Travel** (Thuộc Hệ sinh thái Du lịch "Tất-cả-trong-một" - **HuKi Ecosystem**).
- **Mô hình**: **Super-App Du Lịch Tích Hợp (Unified Single-Portal)** bao gồm 1 Web Application (`web/`) và 1 Mobile Application (`mobile/`).
- **Sứ mệnh hạt nhân**: Gom toàn bộ chuỗi trải nghiệm du lịch (Khách sạn + Xe khách 2 tầng + Thuê xe tự lái + Vé máy bay + Ẩm thực + Điểm check-in + Chia tiền nhóm) vào 1 cổng duy nhất với chiết khấu Combo tiết kiệm 10%.

---

## ⚙️ 2. CHI TIẾT 8 PHÂN HỆ NGHIỆP VỤ CỐT LÕI (CORE BUSINESS MODULES)

1. **HuKi ID (SSO & KYC)**: Đăng nhập tập trung, KYC CCCD/Hộ chiếu/GPLX cho thuê xe.
2. **HuKi Stay**: Đặt phòng khách sạn, Villa & Resort, tồn kho phòng `room_inventory`.
3. **HuKi Bus**: Vé xe khách giường nằm 2 tầng, sơ đồ ghế `seatMap` thời gian thực.
4. **HuKi Ride**: Thuê xe máy & ô tô tự lái, giao xe tận nơi, kiểm tra bằng lái GPLX.
5. **HuKi Trip**: Giỏ hàng chuyến đi đa dịch vụ lồng nhau (Flight + Hotel + Bus + Ride), tự động tính giảm 10% Combo, Global Countdown Timer 10-15 phút.
6. **HuKi Pass**: Ví vé & QR code động đổi token mỗi 30s chống vé giả.
7. **HuKi Wallet & Split Bill**: Quản lý chi tiêu nhóm, thuật toán hạch toán nợ chéo.
8. **HuKi Guide & Taste**: Cẩm nang du lịch, bản đồ ẩm thực đặc sản & điểm sống ảo.

---

## 🏗️ 3. KIẾN TRÚC KỸ THUẬT & STACK CÔNG NGHỆ (FULL-STACK ARCHITECTURE)

- **Frontend (`web/` & `mobile/`)**: Next.js 14 (App Router), React, TypeScript, Zustand, TanStack Query, i18n 10 Ngôn Ngữ toàn cầu (`vi`, `en`, `ko`, `ja`, `th`, `zh`, `fr`, `de`, `es`, `ru`).
- **Backend (`platform/`)**: Node.js, Express, API Gateway Service Discovery Module (`platform/src/gateway/gateway.router.js`), Express Microservices Readiness.
- **Polyglot Persistence**:
  - PostgreSQL (`@prisma/client` + `@prisma/adapter-pg` & `pg` pool): ACID Strict (Users, Stay, Payment).
  - MongoDB Atlas: Giỏ hàng `trips`, sơ đồ xe `bus_trips`, cẩm nang `guide`.
  - Redis Cluster: Cache API, Hold Timer, Redlock chống overbooking.

---

## 📊 4. TIẾN ĐỘ THỰC THI & CÁC ĐỀ XUẤT ĐÃ HOÀN THÀNH

- ✅ `h-dexuat-0000.md`: Master Enterprise Rules & HK Team Protocol.
- ✅ `h-dexuat-0001.md`: Dual DB Integration (PostgreSQL + MongoDB Atlas) & Express APIs (`h-result-0001.md`).
- ✅ `h-dexuat-0002.md`: Microservices & API Gateway Service Discovery Module (`h-result-0002.md`).
- ✅ `h-dexuat-0003.md`: i18n 10 Global Languages Engine & Header Redesign (`h-result-0003.md`).

---

*Vui lòng xem toàn bộ tài liệu quy hoạch chi tiết tại file gốc: [docs/Huki.md](docs/Huki.md).*
