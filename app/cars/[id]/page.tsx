import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import CarGallery from "@/components/CarGallery";

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
    <main className="min-h-screen bg-slate-950 text-white py-20 px-6">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14">

        {/* Gallery */}

        <CarGallery images={galleryImages} />

        {/* Details */}

        <div>

          <p className="text-blue-400 text-lg font-bold mb-2">
            {car.brand}
          </p>

          <h1 className="text-5xl font-bold mb-6">
            {car.model}
          </h1>

          <div className="space-y-5 text-xl">

            <div className="flex justify-between border-b border-slate-800 pb-4">
              <span>سال ساخت</span>
              <span>{car.year}</span>
            </div>

            <div className="flex justify-between border-b border-slate-800 pb-4">
              <span>قیمت</span>

              <span className="text-blue-400 font-bold">
                {car.price}
              </span>

            </div>

          </div>

          <div className="mt-10">

            <h2 className="text-2xl font-bold mb-4">
              توضیحات
            </h2>

            <p className="text-gray-300 leading-8">
              {car.description ||
                "توضیحی ثبت نشده است."}
            </p>

          </div>

          <div className="mt-12 flex gap-4">

            <Link
              href={`/order?carId=${car.id}`}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-center py-4 rounded-2xl font-bold text-lg transition"
            >
              ثبت سفارش
            </Link>

            <Link
              href="/cars"
              className="px-8 py-4 rounded-2xl border border-slate-700 hover:bg-slate-900 transition"
            >
              بازگشت
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}