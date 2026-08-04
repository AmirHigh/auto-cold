import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import CarGallery from "@/components/CarGallery";
import {
  Calendar,
  DollarSign,
  Car,
  Images,
} from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CarDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const car = await prisma.car.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      images: true,
    },
  });

  if (!car) {
    notFound();
  }

  const galleryImages =
    car.images.length > 0
      ? car.images.map((img) => img.image)
      : [car.image];

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-32 pb-24 px-6">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

        {/* Gallery */}

        <CarGallery images={galleryImages} />

        {/* Details */}

        <div>

          <p className="text-blue-400 text-xl font-bold uppercase tracking-[6px]">
            {car.brand}
          </p>

          <h1 className="text-6xl font-black mt-2 mb-8">
            {car.model}
          </h1>

          {/* INFO CARD */}

          <div className="rounded-3xl bg-slate-900 border border-white/10 p-8 space-y-6">

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">

                <Calendar size={22} />

                <span>سال ساخت</span>

              </div>

              <span className="font-bold text-xl">
                {car.year}
              </span>

            </div>

            <div className="border-t border-white/10"></div>

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">

                <DollarSign size={22} />

                <span>قیمت</span>

              </div>

              <span className="text-4xl font-black text-blue-400">
                {car.price}
              </span>

            </div>

            <div className="border-t border-white/10"></div>

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">

                <Images size={22} />

                <span>تصاویر</span>

              </div>

              <span className="font-bold">
                {galleryImages.length}
              </span>

            </div>

          </div>

          {/* DESCRIPTION */}

          <div className="mt-10 rounded-3xl bg-slate-900 border border-white/10 p-8">

            <div className="flex items-center gap-3 mb-5">

              <Car size={24} />

              <h2 className="text-2xl font-bold">
                توضیحات خودرو
              </h2>

            </div>

            <p className="text-gray-300 leading-9 text-lg">
              {car.description ||
                "توضیحی برای این خودرو ثبت نشده است."}
            </p>

          </div>

          {/* BUTTONS */}

          <div className="mt-12 flex gap-4">

            <Link
              href={`/order?carId=${car.id}`}
              className="flex-1 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 text-center text-xl font-black hover:scale-[1.02] duration-300"
            >
              ثبت سفارش
            </Link>

            <Link
              href="/cars"
              className="px-8 py-4 rounded-2xl border border-white/10 hover:border-blue-500 hover:bg-slate-900 duration-300"
            >
              بازگشت
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}