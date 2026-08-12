import { getDestinations, getFeaturedHotels } from "@/lib/api";
import { SiteHeader } from "@/components/site-header";
import { CountryDetailInteractive } from "@/components/country-interactive";

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

  const filteredDestinations = allDestinations.filter((d) => {
    if (countryCode === "vn" && d.is_domestic) return true;
    const countryName = typeof d.country === "string" ? d.country : JSON.stringify(d.country || "");
    return countryName.toLowerCase().includes(countryInfo.name.toLowerCase()) || d.slug.includes(countryCode);
  });

  const countryFoods = filteredDestinations.flatMap((d) => d.foods || []);
  const countryActivities = filteredDestinations.flatMap((d) => d.activities || []);
  const filteredHotels = allHotels.filter((h) => {
    return filteredDestinations.some((d) => d.slug === h.city) ||
      (h.country && h.country.toLowerCase().includes(countryInfo.name.toLowerCase()));
  });

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <SiteHeader transparent={false} />
      <CountryDetailInteractive
        countryInfo={countryInfo}
        destinations={filteredDestinations}
        hotels={filteredHotels}
        foods={countryFoods}
        activities={countryActivities}
      />
    </main>
  );
}
