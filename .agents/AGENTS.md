# Workspace Rules for StayZ

## 1. Quản lý File không phải Source Code (Non-Code Files)
- Tất cả các file không liên quan trực tiếp đến source code ứng dụng (bao gồm: test, docs, agent, skill, prompt, script kiểm thử...) đều phải được lưu trữ bên trong thư mục `Test/` (`e:/CV/StayZ/Test`).

## 2. Quản lý Role / Workflow Markdown Files (`@file`)
- Tạo và duy trì thư mục `Test/roles/` để chứa tập hợp các file `.md` quy định Role/Quy trình làm việc (ví dụ: `fix_error_db.md`, `ui_redesign.md`, `api_integration.md`...).
- Khi người dùng tag file (ví dụ: `@Test/roles/fix_error_db.md`), AI sẽ đọc file và thực hiện đúng vai trò/nhiệm vụ được mô tả trong file đó.

## 3. Quy tắc Giao tiếp & Quy trình Đề xuất -> Thống nhất
- **Phân định Nền tảng (Scope)**:
  - Nếu dòng đầu tiên của câu lệnh có chữ `web`: Tập trung làm việc trên dự án Web (`web/`).
  - Ngược lại (nếu có `mobile` hoặc không nhắc tới `web`): Mặc định tập trung làm việc trên dự án Mobile (`mobile/`).
- **Ưu tiên Dòng Đầu Tiên (First-line Command Priority)**:
  - AI luôn phân tích dòng đầu tiên trong tin nhắn của người dùng để xác định đúng loại lệnh (Action) và Scope.
- **Chế độ Đề xuất (`đề xuất`)**:
  - Nếu dòng đầu có từ `đề xuất`: AI chỉ kiểm tra DB, code, thiết kế và lập kế hoạch/đề xuất giải pháp.
  - **TUYỆT ĐỐI KHÔNG CHỈNH SỬA CODE / KHÔNG SỬA FILE SOURCE CODE** khi ở chế độ `đề xuất`.
- **Chế độ Thực thi (`thống nhất`)**:
  - AI CHỈ bắt đầu viết code hoặc sửa đổi dự án khi người dùng phát lệnh có từ **"thống nhất"** (ví dụ: "thống nhất", "ok thống nhất").

## 4. Quy tắc Đề xuất Bổ sung (`đề xuất thêm MÃ_SỐ`)
- Khi người dùng phát lệnh `đề xuất thêm MÃ_SỐ` (ví dụ: `đề xuất thêm 005`): AI phải **GIỮ NGUYÊN TOÀN BỘ NỘI DUNG NỀN TẢNG CŨ** của file đề xuất `Test/MÃ_SỐ.md` và chỉ **GHI THÊM (APPEND / EXTEND)** các yêu cầu mới vào bên dưới, tuyệt đối không xóa hay ghi đè làm mất các hạng mục cũ.

## 5. Quy tắc Báo cáo Kết quả Thực thi (`Test/result.agent.md`)
- Sau mỗi lần người dùng phát lệnh **`thống nhất`** và AI thực thi xong công việc, AI phải tạo hoặc cập nhật file **`Test/result.agent.md`** (`e:/CV/StayZ/Test/result.agent.md`) để báo cáo chi tiết, minh bạch các việc đã thực hiện thành công kèm kết quả kiểm thử cho người dùng kiểm soát.
