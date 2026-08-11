import { getDestinations } from "@/lib/api";
import { SiteHeader } from "@/components/site-header";
import Link from "next/link";
import { Compass, Camera, Star, MapPin } from "lucide-react";

export default async function ExperiencesPage({ searchParams }: { searchParams: Promise<{ category?: string; page?: string }> }) {
  const { category = "all", page = "1" } = await searchParams;
  const currentPage = parseInt(page, 10) || 1;
  const itemsPerPage = 16;

  const destinations = await getDestinations();

  // Extract all activities with destination slug
  const allActivities = destinations.flatMap((d) =>
    (d.activities || []).map((a) => ({
      ...a,
      citySlug: d.slug,
      cityName: typeof d.name === "object" ? d.name.vi : d.name,
    }))
  );

  let filtered = allActivities;
  if (category !== "all") {
    filtered = allActivities.filter((a) => (a.category || "").toLowerCase().includes(category.toLowerCase()));
  }

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const CATEGORIES = [
    { code: "all", label: "Tất cả trải nghiệm" },
    { code: "heritage", label: "🏛️ Di sản văn hóa" },
    { code: "nature", label: "🌲 Cảnh quan thiên nhiên" },
    { code: "adventure", label: "🧗 Trải nghiệm mạo hiểm" },
    { code: "photo", label: "📸 Điểm Check-in Sống ảo" },
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <SiteHeader transparent={false} />

      <section style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", color: "#fff", padding: "60px 20px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ color: "#fbbf24", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
            <Compass size={14} style={{ display: "inline-block", verticalAlign: "middle" }} /> StayZ Experiences Portal
          </p>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: 12 }}>Điểm Check-in & Trải Nghiệm Du Lịch Nổi Bật</h1>
          <p style={{ opacity: 0.85, fontSize: "1.05rem" }}>
            Khám phá danh thắng, di sản thế giới & các góc check-in tuyệt đẹp (16 items / trang)
          </p>
        </div>
      </section>

      <div className="shell" style={{ paddingTop: 36, paddingBottom: 60 }}>
        {/* Bộ lọc Danh mục */}
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 16, marginBottom: 30 }} className="no-scrollbar">
          {CATEGORIES.map((c) => {
            const isActive = category === c.code;
            return (
              <Link
                key={c.code}
                href={`/experiences?category=${c.code}`}
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
          {paginatedItems.map((act, i) => {
            const actTitle = typeof act.title === "object" ? act.title.vi : act.title;
            const actLoc = typeof act.location_name === "object" ? act.location_name.vi : act.location_name;
            return (
              <div key={i} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
                <img src={act.image_url} alt={actTitle} style={{ width: "100%", height: 170, objectFit: "cover" }} />
                <div style={{ padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>{actTitle}</h3>
                    <span style={{ fontSize: 11, background: "rgba(15,23,42,0.08)", color: "#0f172a", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>
                      {act.cityName}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "#64748b" }}>📍 {actLoc || "Địa danh du lịch nổi tiếng"}</p>
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
                  href={`/experiences?category=${category}&page=${pNum}`}
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
