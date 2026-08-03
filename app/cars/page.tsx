import { prisma } from "@/lib/prisma";
import FeaturedCars from "@/components/FeaturedCars";

type Props = {
  searchParams: Promise<{
    brand?: string;
    model?: string;
    year?: string;
  }>;
};

export default async function CarsPage({
  searchParams,
}: Props) {
  const { brand, model, year } = await searchParams;

  const cars = await prisma.car.findMany({
    where: {
      AND: [
        brand
          ? {
              brand: {
                contains: brand,
                mode: "insensitive",
              },
            }
          : {},

        model
          ? {
              model: {
                contains: model,
                mode: "insensitive",
              },
            }
          : {},

        year
          ? {
              year: Number(year),
            }
          : {},
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      <FeaturedCars cars={cars} />
    </main>
  );
}