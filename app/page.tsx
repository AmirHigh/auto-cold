import { prisma } from "@/lib/prisma";

import HeroSlider from "@/components/HeroSlider";
import SearchBar from "@/components/SearchBar";
import FeaturedCars from "@/components/FeaturedCars";

export default async function HomePage() {

  const cars = await prisma.car.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="bg-slate-950">

      <HeroSlider cars={cars} />

      <SearchBar />

      <FeaturedCars />

    </main>
  );
}