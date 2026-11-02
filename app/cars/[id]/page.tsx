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

type CarImage = {
image: string;
};

export default async function CarDetailsPage({
params,
}: Props) {
const { id } = await params;
const carId = Number(id);

if (!Number.isInteger(carId) || carId <= 0) {
notFound();
}

const car = await prisma.car.findUnique({
where: {
id: carId,
},
include: {
images: true,
},
});

if (!car) {
notFound();
}

const images: CarImage[] = car.images;

const galleryImages: string[] =
images.length > 0
? images.map((img: CarImage) => img.image)
: car.image
? [car.image]
: [];

return ( <main
   className="min-h-screen bg-slate-950 px-6 pb-24 pt-32 text-white"
   dir="rtl"
 > <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
{/* گالری تصاویر */}

```
    <CarGallery images={galleryImages} />

    {/* مشخصات خودرو */}

    <div>
      <p className="text-xl font-bold uppercase tracking-[6px] text-blue-400">
        {car.brand}
      </p>

      <h1 className="mb-8 mt-2 text-5xl font-black sm:text-6xl">
        {car.model}
      </h1>

      {/* کارت اطلاعات خودرو */}

      <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-900 p-8">
        {/* سال ساخت */}

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Calendar size={22} className="text-blue-400" />

            <span>سال ساخت</span>
          </div>

          <span className="text-xl font-bold">
            {car.year}
          </span>
        </div>

        <div className="border-t border-white/10" />

        {/* قیمت */}

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <DollarSign size={22} className="text-blue-400" />

            <span>قیمت</span>
          </div>

          <span className="text-3xl font-black text-blue-400 sm:text-4xl">
            {car.price}
          </span>
        </div>

        <div className="border-t border-white/10" />

        {/* تعداد تصاویر */}

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Images size={22} className="text-blue-400" />

            <span>تعداد تصاویر</span>
          </div>

          <span className="font-bold">
            {galleryImages.length}
          </span>
        </div>
      </div>

      {/* توضیحات خودرو */}

      <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900 p-8">
        <div className="mb-5 flex items-center gap-3">
          <Car size={24} className="text-blue-400" />

          <h2 className="text-2xl font-bold">
            توضیحات خودرو
          </h2>
        </div>

        <p className="text-lg leading-9 text-gray-300">
          {car.description ||
            "توضیحی برای این خودرو ثبت نشده است."}
        </p>
      </div>

      {/* دکمه‌ها */}

      <div className="mt-12 flex flex-col gap-4 sm:flex-row">
        <Link
          href={`/order?carId=${car.id}`}
          className="flex-1 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-4 text-center text-xl font-black transition duration-300 hover:scale-[1.02]"
        >
          ثبت سفارش
        </Link>

        <Link
          href="/cars"
          className="rounded-2xl border border-white/10 px-8 py-4 text-center transition duration-300 hover:border-blue-500 hover:bg-slate-900"
        >
          بازگشت
        </Link>
      </div>
    </div>
  </div>
</main>


);
}
