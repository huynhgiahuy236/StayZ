import { getDestinations } from "@/lib/api";
import { SiteHeader } from "@/components/site-header";
import Link from "next/link";
import { Utensils, Star, MapPin } from "lucide-react";

export default async function TastePage({ searchParams }: { searchParams: Promise<{ city?: string; page?: string }> }) {
  const { city = "all", page = "1" } = await searchParams;
  const currentPage = parseInt(page, 10) || 1;
  const itemsPerPage = 16;

  const destinations = await getDestinations();

  // Extract all foods with destination slug
  const allFoods = destinations.flatMap((d) =>
    (d.foods || []).map((f) => ({
      ...f,
      citySlug: d.slug,
      cityName: typeof d.name === "object" ? d.name.vi : d.name,
    }))
  );

  let filtered = allFoods;
  if (city !== "all") {
    filtered = allFoods.filter((f) => f.citySlug.toLowerCase() === city.toLowerCase());
  }

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const CITIES = [
    { code: "all", label: "Tất cả điểm đến" },
    { code: "da-nang", label: "Đà Nẵng" },
    { code: "ha-noi", label: "Hà Nội" },
    { code: "ho-chi-minh", label: "TP. Hồ Chí Minh" },
    { code: "phu-quoc", label: "Phú Quốc" },
    { code: "hoi-an", label: "Hội An" },
    { code: "tokyo", label: "Tokyo" },
    { code: "seoul", label: "Seoul" },
    { code: "beijing", label: "Bắc Kinh" },
    { code: "bali", label: "Bali" },
    { code: "bangkok", label: "Bangkok" },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <SiteHeader transparent={false} />

      <section style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", color: "#fff", padding: "60px 20px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ color: "#fbbf24", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
            <Utensils size={14} style={{ display: "inline-block", verticalAlign: "middle" }} /> StayZ Culinary Portal
          </p>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: 12 }}>Thiên Đường Ẩm Thực & Quán Ngon Toàn Cầu</h1>
          <p style={{ opacity: 0.85, fontSize: "1.05rem" }}>
            Khám phá món ngon đặc sản gia truyền & nhà hàng cao cấp (16 items / trang)
          </p>
        </div>
      </section>

      <div className="shell" style={{ paddingTop: 36, paddingBottom: 60 }}>
        {/* Bộ lọc Thành phố */}
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 16, marginBottom: 30 }} className="no-scrollbar">
          {CITIES.map((c) => {
            const isActive = city === c.code;
            return (
              <Link
                key={c.code}
                href={`/taste?city=${c.code}`}
                style={{
                  padding: "8px 16px",
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  background: isActive ? "#0f172a" : "#fff",
                  color: isActive ? "#fbbf24" : "#334155",
                  border: isActive ? "1px solid #0f172a" : "1px solid #cbd5e1",
                  boxShadow: isActive ? "0 4px 12px rgba(15,23,42,0.15)" : "none",
                }}
              >
                {c.label}
              </Link>
            );
          })}
        </div>

        {/* Grid 16 Items / Trang */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {paginatedItems.map((food, i) => {
            const titleText = typeof food.title === "object" ? food.title.vi : food.title;
            const spotText = typeof food.recommended_spots?.[0] === "object" ? food.recommended_spots[0].vi : food.recommended_spots?.[0] || (food as Record<string, any>).spot;
            return (
              <div key={i} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
                <img src={food.image_url} alt={titleText} style={{ width: "100%", height: 170, objectFit: "cover" }} />
                <div style={{ padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>{titleText}</h3>
                    <span style={{ fontSize: 11, background: "rgba(217,119,6,0.1)", color: "#d97706", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>
                      {food.cityName}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: 8 }}>📍 {spotText || "Quán ngon gia truyền"}</p>
                  <span style={{ color: "#d97706", fontSize: 13, fontWeight: 700 }}>{food.price_range || (food as Record<string, any>).price || "Giá bình dân"}</span>
                </div>
              </div>
            );
          })}
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
                  href={`/taste?city=${city}&page=${pNum}`}
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
