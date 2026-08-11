import { getFeaturedHotels } from "@/lib/api";
import { SiteHeader } from "@/components/site-header";
import Link from "next/link";
import { Star, MapPin, Hotel, Building2, Home, Castle } from "lucide-react";

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<{ type?: string; page?: string }> }) {
  const { type = "all", page = "1" } = await searchParams;
  const currentPage = parseInt(page, 10) || 1;
  const itemsPerPage = 16;

  const allHotels = await getFeaturedHotels();

  let filtered = allHotels;
  if (type !== "all") {
    filtered = allHotels.filter((h) => {
      const pType = ((h as Record<string, any>).property_type || h.type || "").toLowerCase();
      return pType.includes(type.toLowerCase());
    });
  }

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const PROPERTY_TYPES = [
    { code: "all", label: "Tất cả lưu trú" },
    { code: "hotel", label: "🏨 Khách sạn 5-sao" },
    { code: "resort", label: "🏖️ Khu Nghỉ Dưỡng Resort" },
    { code: "villa", label: "🏡 Biệt thự Villa" },
    { code: "apartment", label: "🏢 Căn hộ Luxury" },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <SiteHeader transparent={false} />

      <section style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", color: "#fff", padding: "60px 20px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ color: "#fbbf24", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
            <Hotel size={14} style={{ display: "inline-block", verticalAlign: "middle" }} /> StayZ Properties Portal
          </p>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: 12 }}>Danh Sách Khách Sạn & Villa Hạng Sang</h1>
          <p style={{ opacity: 0.85, fontSize: "1.05rem" }}>
            Hơn 1.100+ Khách sạn, Resort & Biệt thự Villa 5-sao hàng đầu thế giới (16 items / trang)
          </p>
        </div>
      </section>

      <div className="shell" style={{ paddingTop: 36, paddingBottom: 60 }}>
        {/* Bộ lọc Loại hình */}
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 16, marginBottom: 30 }} className="no-scrollbar">
          {PROPERTY_TYPES.map((t) => {
            const isActive = type === t.code;
            return (
              <Link
                key={t.code}
                href={`/properties?type=${t.code}`}
                style={{
                  padding: "10px 20px",
                  borderRadius: 100,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  background: isActive ? "#0f172a" : "#fff",
                  color: isActive ? "#fbbf24" : "#334155",
                  border: isActive ? "1px solid #0f172a" : "1px solid #cbd5e1",
                  boxShadow: isActive ? "0 4px 12px rgba(15,23,42,0.15)" : "none",
                }}
              >
                {t.label}
              </Link>
            );
          })}
        </div>

        {/* Grid 16 Items / Trang */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {paginatedItems.map((hotel) => (
            <Link href={`/hotel/${hotel.slug || hotel._id}`} key={hotel._id || hotel.slug} style={{ textDecoration: "none" }}>
              <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
                <div style={{ height: 180, position: "relative" }}>
                  <img src={hotel.main_image_url || hotel.gallery_images?.[0]?.url} alt={hotel.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(15,23,42,0.8)", color: "#fbbf24", padding: "4px 8px", borderRadius: 100, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                    <Star size={12} fill="#fbbf24" /> {hotel.rating || 4.9}
                  </div>
                </div>
                <div style={{ padding: 16 }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>{hotel.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: 12, display: "flex", alignItems: "center", gap: 4 }}>
                    <MapPin size={13} /> {hotel.address || hotel.city}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: "1px solid #f1f5f9" }}>
                    <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Giá mỗi đêm</span>
                    <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>{hotel.base_price?.toLocaleString("vi-VN")} đ</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Phân trang (16 Items / Trang) */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 40 }}>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pNum = idx + 1;
              const isActive = currentPage === pNum;
              return (
                <Link
                  key={pNum}
                  href={`/properties?type=${type}&page=${pNum}`}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    textDecoration: "none",
                    background: isActive ? "#0f172a" : "#fff",
                    color: isActive ? "#fbbf24" : "#0f172a",
                    border: isActive ? "none" : "1px solid #cbd5e1",
                  }}
                >
                  {pNum}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
