# 💸 Quy Tắc Thiết Kế Feature: HuKi Wallet & Split Bill (`huki-wallet-service`)

> **Đặc tả kỹ thuật chuyên sâu cấp Senior System Architect cho Phân Hệ Ví Nhóm & Hạch Toán Chia Tiền Chuyến Đi Tự Động.**
> **Tác giả**: Huỳnh Gia Huy (`Huy`) | **HK Team**
> **Mã Service**: `huki-wallet-service` | **Base Route**: `/api/v1/huki/split-bill`

---

## 🏛️ 1. PHẠM VI NGHIỆP VỤ & ĐỊNH VỊ KIẾN TRÚC

- **Chức năng chính**: 
  - Ghi nhận sổ chi tiêu chuyến đi nhóm (Sổ chi chung).
  - Tự động chia đều / chia theo tỷ lệ hóa đơn ăn uống, tiền phòng khách sạn, tiền xăng.
  - Thuật toán **Reconciliation Algorithm (Tối thiểu hóa số lần chuyển tiền)** giữa các thành viên.
  - Tự động tạo link thanh toán VietQR chứa đúng số tiền nợ.
- **Database chỉ định**: **PostgreSQL** (`split_bill_groups`, `split_bill_expenses`, `split_bill_shares`) qua Prisma Driver Adapter (ACID Strict).

---

## 🗄️ 2. ĐẶC TẢ SCHEMA CƠ SỞ DỮ LIỆU (DATABASE SCHEMA)

```prisma
model SplitBillGroup {
  id            String             @id @default(uuid())
  trip_id       String?
  group_name    String
  currency      String             @default("VND")
  created_by    String

  // Audit Fields
  is_deleted    Boolean            @default(false)
  created_at    DateTime           @default(now())

  expenses      SplitBillExpense[]
  @@map("split_bill_groups")
}

model SplitBillExpense {
  id            String           @id @default(uuid())
  group_id      String
  payer_id      String           // Người đứng ra trả tiền trước
  amount        Float
  description   String
  category      String           // FOOD, TRANSPORT, STAY, ENTERTAINMENT

  group         SplitBillGroup   @relation(fields: [group_id], references: [id], onDelete: Cascade)
  shares        SplitBillShare[]
  @@map("split_bill_expenses")
}

model SplitBillShare {
  id            String           @id @default(uuid())
  expense_id    String
  user_id       String           // Người chịu tiền
  owed_amount   Float
  is_settled    Boolean          @default(false)

  expense       SplitBillExpense @relation(fields: [expense_id], references: [id], onDelete: Cascade)
  @@map("split_bill_shares")
}
```

---

## 📡 3. RESTFUL API ENDPOINTS & CONTRACTS

| Phương thức | Endpoint Path | Chức năng | Phân quyền |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/huki/split-bill/groups` | Tạo nhóm chi tiêu chuyến đi | User Authenticated |
| `POST` | `/api/v1/huki/split-bill/expenses` | Thêm khoản chi tiêu mới (Ăn uống, Vé vào cổng...) | User Authenticated |
| `GET` | `/api/v1/huki/split-bill/groups/:id/summary` | Lấy bảng tổng hợp nợ chéo & thuật toán tối ưu chuyển tiền | User Authenticated |
| `POST` | `/api/v1/huki/split-bill/settle` | Ghi nhận đã thanh toán chuyển khoản | User Authenticated |

---

## ⚙️ 4. THUẬT TOÁN HẠCH TOÁN NỢ CHÉO TỐI ƯU (RECONCILIATION ALGORITHM)

1. **Bài Toán Tối Ưu Chuyển Tiền Nhóm**:
   - Giả sử có 4 thành viên A, B, C, D. Nếu A trả 2 triệu cho cả nhóm, B trả 1 triệu cho cả nhóm:
   - Thuật toán tính số dư ròng `netBalance[user] = totalPaid - totalOwed`.
   - Sử dụng thuật toán Min-Heap / Max-Heap ghép cặp người âm nợ lớn nhất với người dương nợ lớn nhất.
   - **Kết quả**: Triệt tiêu tất cả giao dịch bắc cầu, đảm bảo **số lượt chuyển khoản tối đa $\le N - 1$** (N là số người trong nhóm).
