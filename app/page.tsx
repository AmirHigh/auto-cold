import { prisma } from "@/lib/prisma";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import SearchBar from "@/components/SearchBar";
import FeaturedCars from "@/components/FeaturedCars";

import Stats from "@/components/Stats";
import WhyUs from "@/components/WhyUs";
import CTA from "@/components/CTA";

export default async function HomePage() {
  const cars = await prisma.car.findMany({
    include: {
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="bg-slate-950">

      <HeroSlider cars={cars} />

      <Stats />

      <SearchBar />

      <FeaturedCars cars={cars} />

      <WhyUs />

      <CTA /><Footer />

    </main>
  );
}