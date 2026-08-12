---
name: stayz-i18n
description: StayZ 10-language i18n system. No-key approach (Vietnamese as master key), `t()` function pattern, localStorage state management, translation dictionary files (vi/en/ko/ja/th/zh/fr/de/es/ru), client component patterns, systematic translation workflow.
license: MIT
metadata:
  author: StayZ
  version: "1.0.0"
---

# StayZ i18n System (10 Ngôn Ngữ)

Hệ thống đa ngôn ngữ của StayZ hỗ trợ 10 ngôn ngữ với approach no-key (Tiếng Việt làm master key).

## Khi Nào Sử Dụng

- Thêm translation key mới
- Convert component sang i18n
- Audit hardcoded Vietnamese text
- Đồng bộ 10 dictionaries
- Fix lỗi missing translations

## 10 Ngôn Ngữ Hỗ Trợ

| Code | Language | Flag | File |
|------|----------|------|------|
| `vi` | Tiếng Việt (master) | 🇻🇳 | `vi.ts` |
| `en` | English | 🇬🇧 | `en.ts` |
| `ko` | 한국어 | 🇰🇷 | `ko.ts` |
| `ja` | 日本語 | 🇯🇵 | `ja.ts` |
| `th` | ไทย | 🇹🇭 | `th.ts` |
| `zh` | 中文 | 🇨🇳 | `zh.ts` |
| `fr` | Français | 🇫🇷 | `fr.ts` |
| `de` | Deutsch | 🇩🇪 | `de.ts` |
| `es` | Español | 🇪🇸 | `es.ts` |
| `ru` | Русский | 🇷🇺 | `ru.ts` |

## No-Key Approach

**Master Key = Cụm Tiếng Việt Gốc**
**Value = Bản Dịch Bản Xứ**

```typescript
// vi.ts
export const viDict: Record<string, string> = {
  "Khách Sạn & Villa": "Khách Sạn & Villa",  // Master key = value
  "Đăng Nhập": "Đăng Nhập",
  "Tìm kiếm ngay": "Tìm kiếm ngay",
};

// en.ts
export const enDict: Record<string, string> = {
  "Khách Sạn & Villa": "Stays & Villas",     // Master key → English
  "Đăng Nhập": "Log In",
  "Tìm kiếm ngay": "Search Now",
};
```

**Ưu điểm:**
- ✅ Không cần đặt key name ("nav.login" → "Đăng Nhập")
- ✅ Key tự đọc được (human-readable)
- ✅ Dễ audit missing translations

## T Function Pattern

```typescript
import { t, Language } from "@/lib/i18n";

// Trong component
const text = t("Khách Sạn & Villa", currentLang);
// → "Stays & Villas" nếu currentLang = "en"
// → "숙소 & 빌라" nếu currentLang = "ko"
```

**Fallback chain:**
```
input → vi → en → ko → ja → th → zh → fr → de → es → ru
```

## Client Component Pattern (BẮT BUỘC)

Mọi component dùng i18n phải là `"use client"`:

```typescript
"use client";
import { useEffect, useState } from "react";
import { t, Language } from "@/lib/i18n";

export function MyComponent() {
  const [lang, setLang] = useState<Language>("vi");

  useEffect(() => {
    const saved = (localStorage.getItem("stayz_lang") as Language) || "vi";
    setLang(saved);

    // Optional: listen to language changes
    const handleLangChange = (e: CustomEvent<{ lang: Language }>) => {
      if (e.detail?.lang) setLang(e.detail.lang);
    };
    window.addEventListener("stayz_lang_changed" as any, handleLangChange as any);
    return () => window.removeEventListener("stayz_lang_changed" as any, handleLangChange as any);
  }, []);

  return <h1>{t("Tiêu đề", lang)}</h1>;
}
```

## Server Component → Client Component Conversion

**Trước (sai):**
```typescript
// app/policy/page.tsx - Server Component
export default function PolicyPage() {
  return <h1>Chính sách & Điều khoản dịch vụ</h1>;
}
```

**Sau (đúng):**
```typescript
"use client";
// app/policy/page.tsx - Client Component
import { useEffect, useState } from "react";
import { t, Language } from "@/lib/i18n";

export default function PolicyPage() {
  const [lang, setLang] = useState<Language>("vi");

  useEffect(() => {
    const saved = (localStorage.getItem("stayz_lang") as Language) || "vi";
    setLang(saved);
  }, []);

  return <h1>{t("Chính sách & Điều khoản dịch vụ", lang)}</h1>;
}
```

## SiteHeader Lang Change

Khi truyền `lang` qua SiteHeader:

```typescript
"use client";
import { SiteHeader } from "@/components/site-header";

export default function MyPage() {
  const [lang, setLang] = useState<Language>("vi");

  useEffect(() => {
    const saved = (localStorage.getItem("stayz_lang") as Language) || "vi";
    setLang(saved);
  }, []);

  return (
    <>
      <SiteHeader lang={lang} onLangChange={setLang} />
      <main>
        <h1>{t("Tiêu đề trang", lang)}</h1>
      </main>
    </>
  );
}
```

## Multi-Level Nav Pattern

```typescript
const COUNTRIES = [
  { code: "vn", flagUrl: "...", label: t("Việt Nam", lang), slug: "vietnam" },
  { code: "id", flagUrl: "...", label: t("Indonesia", lang), slug: "bali" },
  // ...12 quốc gia
];

// Render
<div className="countries-grid">
  {COUNTRIES.map(c => (
    <Link key={c.code} href={`/destinations/${c.slug}`}>
      <img src={c.flagUrl} alt={c.label} />
      <span>{c.label}</span>
    </Link>
  ))}
</div>
```

## Translation Workflow

### Bước 1: Thêm key vào vi.ts (master)
```typescript
// web/src/lib/i18n/dict/vi.ts
export const viDict = {
  // ... existing keys
  "Key mới": "Key mới",  // ← Master = Vietnamese
};
```

### Bước 2: Thêm translation vào 9 ngôn ngữ còn lại
```typescript
// en.ts
"Key mới": "New Key",

// ko.ts
"Key mới": "새로운 키",

// ja.ts
"Key mới": "新しいキー",

// th.ts
"Key mới": "คีย์ใหม่",

// zh.ts
"Key mới": "新键",

// fr.ts
"Key mới": "Nouvelle clé",

// de.ts
"Key mới": "Neuer Schlüssel",

// es.ts
"Key mới": "Nueva clave",

// ru.ts
"Key mới": "Новый ключ",
```

### Bước 3: Sử dụng trong component
```typescript
{t("Key mới", lang)}
```

## Audit Checklist

Khi audit code để tìm hardcoded Vietnamese:

```bash
# Tìm JSX text tiếng Việt
grep -r ">[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]" web/src --include="*.tsx" -l

# Tìm string literal tiếng Việt trong code
grep -r '"[A-ZÀÁẠẢÃ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*"' web/src --include="*.tsx" -l
```

## Quy Tắc Proper Nouns

**KHÔNG dịch** (proper nouns):
- Tên thành phố: Đà Nẵng, Tokyo, Seoul, Bangkok
- Tên quốc gia: Việt Nam, Nhật Bản, Hàn Quốc
- Tên brand: StayZ, HuKi Travel, PayOS
- Tên riêng: Phở, Sushi, Wagyu, Angkor Wat
- Tên khách sạn: Vinpearl, InterContinental

**PHẢI dịch** (common text):
- Buttons: "Đặt Ngay", "Tìm kiếm ngay", "Xem thêm"
- Labels: "Khách Sạn", "Phòng", "Đêm"
- Status: "Đã xác nhận", "Chờ thanh toán"
- Errors: "Vui lòng nhập email"

## Files Liên Quan

- **Dictionaries**: [web/src/lib/i18n/dict/](../../../web/src/lib/i18n/dict/) (10 files)
- **Core**: [web/src/lib/i18n/index.ts](../../../web/src/lib/i18n/index.ts)
- **SiteHeader**: [web/src/components/site-header.tsx](../../../web/src/components/site-header.tsx)

## Common Pitfalls

### Pitfall 1: Quên "use client"
```typescript
// ❌ SAI - Server Component không dùng được useState/useEffect
import { t } from "@/lib/i18n";

export default function Page() {
  return <h1>{t("Title", "vi")}</h1>;  // Hardcoded lang!
}
```

**Fix:** Thêm `"use client"` và `useState` + `useEffect`.

### Pitfall 2: Quên cập nhật 9 ngôn ngữ còn lại
- Thêm key vào vi.ts → DỪNG ở đó
- **Phải** thêm vào 9 file còn lại

### Pitfall 3: Hardcoded lang="vi"
```typescript
// ❌ SAI
return <h1>{t("Title", "vi")}</h1>;  // Luôn tiếng Việt!

// ✅ ĐÚNG
return <h1>{t("Title", lang)}</h1>;  // Dynamic
```

### Pitfall 4: Không xử lý fallback
```typescript
// Đã OK - hàm t() có fallback chain:
// vi → en → ko → ja → th → zh → fr → de → es → ru
```

## Performance Tips

1. **Memoization**: Cho component lớn, dùng `useMemo` để cache translations
2. **Server-side rendering**: SSR chỉ render ngôn ngữ mặc định, client hydrate
3. **Lazy load**: Với 10 ngôn ngữ, chỉ load dictionary đang dùng (optimization sau)

## Testing

```typescript
// test/i18n.test.ts
import { viDict, enDict, koDict } from "@/lib/i18n/dict";

test("All keys exist in all 10 languages", () => {
  const viKeys = Object.keys(viDict);
  for (const lang of [enDict, koDict, jaDict, thDict, zhDict, frDict, deDict, esDict, ruDict]) {
    for (const key of viKeys) {
      expect(lang[key]).toBeDefined();
    }
  }
});
```

## Kết Quả Mong Đợi

Sau khi áp dụng đầy đủ:
- ✅ Web UI hiển thị đúng 10 ngôn ngữ
- ✅ Language selector switch real-time
- ✅ Search bar dropdown có tên quốc gia đúng ngôn ngữ
- ✅ Destinations, hotel details, booking flow đều i18n
- ✅ localStorage persist language preference