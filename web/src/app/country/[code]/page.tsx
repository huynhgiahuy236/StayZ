import { getDestinations, getFeaturedHotels } from "@/lib/api";
import { SiteHeader } from "@/components/site-header";
import Link from "next/link";
import { Compass, Star, MapPin, Utensils, Hotel as HotelIcon, Camera, ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ code: string }>;
}

const COUNTRY_MAP: Record<string, { name: string; flag: string; slogan: string; hero: string }> = {
  vn: { name: "Việt Nam", flag: "🇻🇳", slogan: "Vẻ đẹp thiên nhiên hùng vĩ & di sản văn hóa ngàn năm", hero: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1600&q=85" },
  us: { name: "Mỹ", flag: "🇺🇸", slogan: "Kinh đô giải trí, biểu tượng thời đại & thiên nhiên kỳ vĩ", hero: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1600&q=85" },
  cn: { name: "Trung Quốc", flag: "🇨🇳", slogan: "Hành trình di sản Tử Cấm Thành & Vạn Lý Trường Thành", hero: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1600&q=85" },
  id: { name: "Indonesia (Bali)", flag: "🇮🇩", slogan: "Thiên đường nhiệt đới đền biển cổ kính & ruộng bậc thang", hero: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85" },
  ch: { name: "Thụy Sĩ", flag: "🇨🇭", slogan: "Trái tim dãy Alps, đỉnh núi tuyết Matterhorn & hồ soi bóng", hero: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1600&q=85" },
  br: { name: "Brazil", flag: "🇧🇷", slogan: "Vũ điệu Samba rực rỡ, bãi biển Copacabana & rừng Amazon", hero: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1600&q=85" },
  ar: { name: "Argentina", flag: "🇦🇷", slogan: "Vũ điệu Tango nồng nàn, sông băng Perito Moreno & Asado", hero: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=1600&q=85" },
  au: { name: "Úc", flag: "🇦🇺", slogan: "Nhà hát Con Sò Sydney, Cầu Cảng & rạn san hô Great Barrier", hero: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=85" },
  jp: { name: "Nhật Bản", flag: "🇯🇵", slogan: "Xứ sở hoa anh đào, núi Phú Sĩ & cổng đền Torii rực rỡ", hero: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85" },
  kr: { name: "Hàn Quốc", flag: "🇰🇷", slogan: "Thủ đô thời trang K-pop nhộn nhịp & cung điện Gyeongbokgung", hero: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1600&q=85" },
  th: { name: "Thái Lan", flag: "🇹🇭", slogan: "Xứ sở Chùa Vàng rực rỡ, bãi biển ngọc Phuket & chợ đêm", hero: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1600&q=85" },
  sg: { name: "Singapore", flag: "🇸🇬", slogan: "Đảo quốc sư tử hiện đại xanh mát & Jewel Changi", hero: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=85" },
};

export default async function CountryDetailPage({ params }: Props) {
  const { code } = await params;
  const countryCode = code.toLowerCase();
  const countryInfo = COUNTRY_MAP[countryCode] || {
    name: countryCode.toUpperCase(),
    flag: "🌍",
    slogan: "Khám phá vẻ đẹp di sản & khách sạn hàng đầu",
    hero: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85",
  };

  const [allDestinations, allHotels] = await Promise.all([
    getDestinations(),
    getFeaturedHotels(),
  ]);

  // Filter destinations belonging to this country
  const filteredDestinations = allDestinations.filter((d) => {
    if (countryCode === "vn" && d.is_domestic) return true;
    const countryName = typeof d.country === "string" ? d.country : JSON.stringify(d.country || "");
    return countryName.toLowerCase().includes(countryInfo.name.toLowerCase()) || d.slug.includes(countryCode);
  });

  // Extract all foods, activities, hotels belonging to this country
  const countryFoods = filteredDestinations.flatMap((d) => d.foods || []);
  const countryActivities = filteredDestinations.flatMap((d) => d.activities || []);
  const filteredHotels = allHotels.filter((h) => {
    return filteredDestinations.some((d) => d.slug === h.city) ||
      (h.country && h.country.toLowerCase().includes(countryInfo.name.toLowerCase()));
  });

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <SiteHeader transparent={false} />

      {/* Hero Banner */}
      <section style={{ position: "relative", minHeight: 380, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", padding: "80px 20px 40px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${countryInfo.hero})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.55)" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 800 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#fbbf24", fontSize: 13, fontWeight: 700, marginBottom: 16, textDecoration: "none" }}>
            <ArrowLeft size={16} /> Quay lại Trang Chủ
          </Link>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <span>{countryInfo.flag}</span>
            <span>{countryInfo.name}</span>
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.9, marginBottom: 24, lineHeight: 1.6 }}>{countryInfo.slogan}</p>
          <div style={{ display: "inline-flex", gap: 20, background: "rgba(15,23,42,0.6)", backdropFilter: "blur(10px)", padding: "12px 24px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.2)" }}>
            <span>📍 <strong>{filteredDestinations.length}</strong> Nơi du lịch</span>
            <span>🏨 <strong>{filteredHotels.length || 8}</strong> Khách sạn 5-sao</span>
            <span>🍲 <strong>{countryFoods.length || 8}</strong> Món đặc sản</span>
            <span>📸 <strong>{countryActivities.length || 12}</strong> Check-in hot</span>
          </div>
        </div>
      </section>

      <div className="shell" style={{ paddingTop: 40, paddingBottom: 60 }}>
        {/* CẤP 2: DANH SÁCH NƠI DU LỊCH (DESTINATIONS) */}
        <section style={{ marginBottom: 50 }}>
          <div style={{ marginBottom: 20 }}>
            <p className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#d97706", fontSize: 13, fontWeight: 700 }}>
              <Compass size={14} /> Cấp Bậc 1 & 2 CSDL
            </p>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a" }}>Nơi Du Lịch Nổi Bật Tại {countryInfo.name}</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {filteredDestinations.map((d) => {
              const nameText = typeof d.name === "object" ? d.name.vi : d.name;
              const noteText = typeof d.summary === "object" ? d.summary.vi : d.summary;
              return (
                <Link href={`/search?city=${d.slug}`} key={d._id || d.slug} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
                    <div style={{ height: 180, position: "relative" }}>
                      <img src={d.hero_image} alt={nameText} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(15,23,42,0.8)", color: "#fbbf24", padding: "4px 8px", borderRadius: 100, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                        <Star size={12} fill="#fbbf24" /> {d.rating || 4.9}
                      </div>
                    </div>
                    <div style={{ padding: 16 }}>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>{nameText}</h3>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.4 }}>{noteText || "Điểm đến tuyệt vời"}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CẤP 3: ẨM THỰC ĐẶC SẢN (FOODS) */}
        {countryFoods.length > 0 && (
          <section style={{ marginBottom: 50 }}>
            <div style={{ marginBottom: 20 }}>
              <p className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#d97706", fontSize: 13, fontWeight: 700 }}>
                <Utensils size={14} /> Cấp Bậc 3 CSDL
              </p>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a" }}>Ẩm Thực & Quán Ngon {countryInfo.name}</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
              {countryFoods.slice(0, 8).map((food, i) => {
                const titleText = typeof food.title === "object" ? food.title.vi : food.title;
                const spotText = typeof food.recommended_spots?.[0] === "object" ? food.recommended_spots[0].vi : food.recommended_spots?.[0] || (food as Record<string, any>).spot;
                return (
                  <div key={i} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
                    <img src={food.image_url} alt={titleText} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                    <div style={{ padding: 16 }}>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{titleText}</h4>
                      <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: 8 }}>📍 {spotText || "Quán ngon gia truyền"}</p>
                      <span style={{ color: "#d97706", fontSize: 13, fontWeight: 700 }}>{food.price_range || (food as Record<string, any>).price || "Giá bình dân"}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* CẤP 4: TRẢI NGHIỆM & CHECK-IN (ACTIVITIES) */}
        {countryActivities.length > 0 && (
          <section style={{ marginBottom: 50 }}>
            <div style={{ marginBottom: 20 }}>
              <p className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#d97706", fontSize: 13, fontWeight: 700 }}>
                <Camera size={14} /> Cấp Bậc 4 CSDL
              </p>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a" }}>Điểm Check-in & Trải Nghiệm Sống Ảo</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
              {countryActivities.slice(0, 8).map((act, i) => {
                const actTitle = typeof act.title === "object" ? act.title.vi : act.title;
                const actLoc = typeof act.location_name === "object" ? act.location_name.vi : act.location_name;
                return (
                  <div key={i} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
                    <img src={act.image_url} alt={actTitle} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                    <div style={{ padding: 16 }}>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{actTitle}</h4>
                      <p style={{ fontSize: "0.8rem", color: "#64748b" }}>📍 {actLoc || "Địa danh nổi tiếng"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* CẤP 5: KHÁCH SẠN & VILLA 5-SAO (PROPERTIES & ROOMS) */}
        <section>
          <div style={{ marginBottom: 20 }}>
            <p className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#d97706", fontSize: 13, fontWeight: 700 }}>
              <HotelIcon size={14} /> Cấp Bậc 5 CSDL
            </p>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a" }}>Khách Sạn & Villa Hạng Sang Tại {countryInfo.name}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {filteredHotels.slice(0, 8).map((hotel) => (
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
        </section>
      </div>
    </main>
  );
}
