import { SearchInteractive } from "@/components/search-interactive";
import { searchHotels } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tìm Kiếm Khách Sạn & Villa 5-Sao — HuKi Travel Ecosystem",
  description: "Khám phá danh mục Khách sạn, Villa, Resort và Căn hộ dịch vụ cao cấp trên toàn cầu với ưu đãi cọc 30% linh hoạt.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const hotels = await searchHotels({
    keyword: params.keyword,
    city: params.city,
    guests: params.guests,
    type: params.type,
  });

  return (
    <SearchInteractive
      initialHotels={hotels}
      initialCity={params.city}
      initialKeyword={params.keyword}
      initialGuests={params.guests}
      initialType={params.type}
    />
  );
}
