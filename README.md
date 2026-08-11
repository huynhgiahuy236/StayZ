# StayZ Application System (Web - Mobile - Platform)

Hệ thống đặt phòng và quản lý StayZ hoàn chỉnh bao gồm ứng dụng di động Flutter (`mobile`), ứng dụng Web Next.js (`web`), và dịch vụ máy chủ Backend Node.js API (`platform`).

## Cấu trúc thư mục dự án

```text
StayZ/
├── mobile/       # Ứng dụng di động Flutter (iOS & Android)
├── web/          # Ứng dụng Web Next.js (Khách hàng & Đặt phòng)
├── platform/     # Dịch vụ Backend Node.js Express API & MongoDB
├── Test/         # Thư mục chứa log & file kiểm thử agent (Độc lập, đã `.gitignore`)
├── README.md     # Tài liệu hướng dẫn sử dụng
└── .gitignore    # File cấu hình lọc tài nguyên đẩy lên Git
```

---

## Hướng dẫn khởi chạy từng dịch vụ

### 1. Khởi chạy Backend Platform (`platform`)
```bash
cd platform
npm install
npm run dev
```
Máy chủ API sẽ chạy tại: `http://localhost:4000/api/v1`

### 2. Khởi chạy Ứng dụng Di động (`mobile`)
```bash
cd mobile
flutter run
```

### 3. Khởi chạy Ứng dụng Web (`web`)
```bash
cd web
npm install
npm run dev
```
Giao diện Web sẽ chạy tại: `http://localhost:3000`
