import { getDestinations } from "@/lib/api";
import { SiteHeader } from "@/components/site-header";
import { DestinationsInteractive } from "@/components/destinations-interactive";

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
      <DestinationsInteractive
        countries={COUNTRIES}
        currentCountry={country}
        destinations={paginatedItems}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </main>
  );
}
