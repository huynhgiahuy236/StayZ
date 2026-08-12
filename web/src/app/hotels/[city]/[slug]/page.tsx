import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { HotelDetailInteractive } from "@/components/hotel-detail-interactive";
import { getHotel, getRoomsByProperty, getReviews } from "@/lib/api";

export async function generateMetadata({ params }: { params: Promise<{ city: string; slug: string }> }) {
  const { city, slug } = await params;
  const hotel = await getHotel(city, slug);
  return {
    title: hotel ? `${hotel.title} — StayZ` : "Khách sạn — StayZ",
    description: hotel?.description ?? `Đặt phòng tại ${hotel?.title ?? "khách sạn"} qua StayZ.`,
  };
}

export default async function HotelDetail({ params }: { params: Promise<{ city: string; slug: string }> }) {
  const { city, slug } = await params;
  const hotel = await getHotel(city, slug);
  if (!hotel) notFound();

  const [rooms, reviews] = await Promise.all([
    getRoomsByProperty(hotel._id),
    getReviews(hotel._id),
  ]);

  const images = [hotel.main_image_url, ...(hotel.gallery_images?.map((g) => g.url) ?? [])].filter(Boolean) as string[];
  const price = hotel.min_price ?? hotel.base_price;
  const enabledAmenities = Object.entries(hotel.amenities ?? {}).filter(([, v]) => v).map(([k]) => k);
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;
  const activeRooms = rooms.filter((r) => r.is_active);

  return (
    <main id="main-content">
      <SiteHeader />
      <HotelDetailInteractive
        hotel={hotel}
        city={city}
        slug={slug}
        rooms={rooms}
        reviews={reviews}
        images={images}
        price={price}
        enabledAmenities={enabledAmenities}
        avgRating={avgRating}
        activeRooms={activeRooms}
      />
    </main>
  );
}
