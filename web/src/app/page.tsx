import { getFeaturedHotels, getDestinations } from "@/lib/api";
import { HomeInteractive } from "@/components/home-interactive";

export default async function Home() {
  const [hotels, destinations] = await Promise.all([
    getFeaturedHotels(),
    getDestinations(),
  ]);

  return <HomeInteractive initialHotels={hotels} initialDestinations={destinations} />;
}
