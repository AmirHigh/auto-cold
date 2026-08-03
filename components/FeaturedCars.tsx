import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: string;
  image: string;
  description: string | null;
};

type Props = {
  cars?: Car[];
};

export default async function FeaturedCars({ cars }: Props) {
  const featuredCars =
    cars ??
    (await prisma.car.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }));

  return (
    <section className="bg-slate-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-white mb-12">
          خودروهای ویژه
        </h2>

        {featuredCars.length === 0 ? (
          <div className="text-center text-gray-400 text-2xl py-20">
            خودرویی با این مشخصات پیدا نشد.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {featuredCars.map((car) => (
              <div
                key={car.id}
                className="group rounded-3xl overflow-hidden bg-slate-900 border border-blue-500/20 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >

                <div className="relative h-60 overflow-hidden">

                  <Image
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute top-4 left-4 bg-blue-600 px-3 py-1 rounded-full text-sm font-bold">
                    {car.year}
                  </div>

                </div>

                <div className="p-6">

                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="text-2xl font-bold text-white">
                        {car.brand}
                      </h3>

                      <p className="text-gray-400 mt-1">
                        {car.model}
                      </p>

                    </div>

                  </div>

                  {car.description && (
                    <p className="text-gray-400 text-sm mt-4 line-clamp-3">
                      {car.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-6">

                    <span className="text-2xl font-bold text-blue-400">
                      {car.price}
                    </span>

                  </div>

                  <Link
                    href={`/cars/${car.id}`}
                    className="block mt-6 w-full text-center bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition"
                  >
                    مشاهده جزئیات
                  </Link>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}