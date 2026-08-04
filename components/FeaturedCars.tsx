import Link from "next/link";
import Image from "next/image";
import { Images } from "lucide-react";
import { prisma } from "@/lib/prisma";

type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: string;
  image: string;
  description: string | null;
  images?: {
    id: number;
    image: string;
  }[];
};

type Props = {
  cars?: Car[];
};

export default async function FeaturedCars({ cars }: Props) {
  const featuredCars =
    cars ??
    (await prisma.car.findMany({
      include: {
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }));

  return (
    <section className="bg-slate-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-black text-center mb-14">
          خودروهای ویژه
        </h2>

        {featuredCars.length === 0 ? (
          <div className="text-center text-2xl text-gray-400 py-20">
            خودرویی پیدا نشد.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {featuredCars.map((car) => (

              <div
                key={car.id}
                className="group rounded-3xl overflow-hidden bg-slate-900 border border-white/10 hover:border-blue-500 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)]"
              >

                <div className="relative h-64 overflow-hidden">

                  <Image
                    src={car.image}
                    alt={car.model}
                    fill
                    className="object-cover group-hover:scale-110 duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-md px-4 py-1 rounded-full font-bold">
                    {car.year}
                  </div>

                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-2 rounded-full text-sm">

                    <Images size={16} />

                    {car.images?.length ?? 1} تصویر

                  </div>

                </div>

                <div className="p-6">

                  <h3 className="text-3xl font-bold">
                    {car.brand}
                  </h3>

                  <p className="text-gray-400 mt-1 text-lg">
                    {car.model}
                  </p>

                  {car.description && (
                    <p className="text-gray-400 mt-5 line-clamp-2 leading-7">
                      {car.description}
                    </p>
                  )}

                  <div className="mt-7 flex items-center justify-between">

                    <span className="text-3xl font-black text-blue-400">
                      {car.price}
                    </span>

                  </div>

                  <Link
                    href={`/cars/${car.id}`}
                    className="mt-8 block w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 text-center font-bold hover:scale-[1.02] duration-300"
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