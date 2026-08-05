import { prisma } from "@/lib/prisma";

import HeroSlider from "@/components/HeroSlider";
import Stats from "@/components/Stats";
import SearchBar from "@/components/SearchBar";
import FeaturedCars from "@/components/FeaturedCars";
import WhyUs from "@/components/WhyUs";

export default async function HomePage() {
  const cars = await prisma.car.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: true,
    },
  });

  return (
    <main className="bg-slate-950">
      <HeroSlider cars={cars} />

      <Stats />

      <SearchBar />

      <FeaturedCars cars={cars} />

      <WhyUs />
    </main>
  );
}