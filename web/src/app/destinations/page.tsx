import { getDestinations } from "@/lib/api";
import { SiteHeader } from "@/components/site-header";
import Link from "next/link";
import { Compass, Star, MapPin, Search } from "lucide-react";

export default async function DestinationsPage({ searchParams }: { searchParams: Promise<{ country?: string; page?: string }> }) {
  const { country = "all", page = "1" } = await searchParams;
  const currentPage = parseInt(page, 10) || 1;
  const itemsPerPage = 16;

  const allDestinations = await getDestinations();

  let filtered = allDestinations;
  if (country !== "all") {
    filtered = allDestinations.filter((d) => {
      if (country === "vn" && d.is_domestic) return true;
      const countryStr = typeof d.country === "string" ? d.country : JSON.stringify(d.country || "");
      return countryStr.toLowerCase().includes(country.toLowerCase()) || d.slug.includes(country);
    });
  }

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const COUNTRIES = [
    { code: "all", label: "Tất cả (12 Quốc gia)" },
    { code: "vn", label: "🇻🇳 Việt Nam" },
    { code: "us", label: "🇺🇸 Mỹ" },
    { code: "cn", label: "🇨🇳 Trung Quốc" },
    { code: "id", label: "🇮🇩 Indonesia" },
    { code: "ch", label: "🇨🇭 Thụy Sĩ" },
    { code: "br", label: "🇧🇷 Brazil" },
    { code: "ar", label: "🇦🇷 Argentina" },
    { code: "au", label: "🇦🇺 Úc" },
    { code: "jp", label: "🇯🇵 Nhật Bản" },
    { code: "kr", label: "🇰🇷 Hàn Quốc" },
    { code: "th", label: "🇹🇭 Thái Lan" },
    { code: "sg", label: "🇸🇬 Singapore" },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <SiteHeader transparent={false} />

      <section style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", color: "#fff", padding: "60px 20px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ color: "#fbbf24", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
            <Compass size={14} style={{ display: "inline-block", verticalAlign: "middle" }} /> StayZ Destinations Portal
          </p>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: 12 }}>Khám Phá Nơi Du Lịch Toàn Cầu</h1>
          <p style={{ opacity: 0.85, fontSize: "1.05rem" }}>
            Tất cả 96 thành phố & điểm đến di sản nổi tiếng khắp 12 Quốc gia chuẩn 16 items / trang
          </p>
        </div>
      </section>

      <div className="shell" style={{ paddingTop: 36, paddingBottom: 60 }}>
        {/* Bộ lọc Quốc gia */}
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 16, marginBottom: 30 }} className="no-scrollbar">
          {COUNTRIES.map((c) => {
            const isActive = country === c.code;
            return (
              <Link
                key={c.code}
                href={`/destinations?country=${c.code}`}
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
          {paginatedItems.map((dest) => {
            const nameText = typeof dest.name === "object" ? dest.name.vi : dest.name;
            const summaryText = typeof dest.summary === "object" ? dest.summary.vi : dest.summary;
            return (
              <Link href={`/search?city=${dest.slug}`} key={dest._id || dest.slug} style={{ textDecoration: "none" }}>
                <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
                  <div style={{ height: 180, position: "relative" }}>
                    <img src={dest.hero_image} alt={nameText} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(15,23,42,0.8)", color: "#fbbf24", padding: "4px 8px", borderRadius: 100, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                      <Star size={12} fill="#fbbf24" /> {dest.rating || 4.9}
                    </div>
                  </div>
                  <div style={{ padding: 16 }}>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>{nameText}</h3>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {summaryText || "Điểm đến trải nghiệm tuyệt vời"}
                    </p>
                  </div>
                </div>
              </Link>
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
                  href={`/destinations?country=${country}&page=${pNum}`}
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
