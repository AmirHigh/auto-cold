"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import FavoriteButton from "@/components/FavoriteButton";

type CarStatus = "AVAILABLE" | "RESERVED" | "SOLD";

type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: string;
  image: string | null;
  description?: string | null;
  status: CarStatus;
};

type Props = {
  cars: Car[];
};

const statusInfo: Record<
  CarStatus,
  {
    label: string;
    className: string;
  }
> = {
  AVAILABLE: {
    label: "موجود",
    className: "bg-green-500 text-white",
  },

  RESERVED: {
    label: "رزرو شده",
    className: "bg-yellow-500 text-black",
  },

  SOLD: {
    label: "فروخته شد",
    className: "bg-red-600 text-white",
  },
};

export default function FeaturedCars({ cars }: Props) {
  const [selectedBrand, setSelectedBrand] = useState("همه");

  // استخراج خودکار برندها
  const brands = useMemo(() => {
    const uniqueBrands = Array.from(
      new Set(
        cars
          .map((car) => car.brand.trim())
          .filter(Boolean)
      )
    );

    return ["همه", ...uniqueBrands];
  }, [cars]);

  // فیلتر خودروها بر اساس برند
  const filteredCars = useMemo(() => {
    if (selectedBrand === "همه") {
      return cars;
    }

    return cars.filter(
      (car) => car.brand.trim() === selectedBrand
    );
  }, [cars, selectedBrand]);

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* عنوان بخش */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold tracking-[0.3em] text-blue-400">
            AUTO COLD
          </p>

          <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl">
            خودروهای ویژه
          </h2>

          <p className="text-gray-400">
            بهترین خودروهای موجود در AUTO COLD
          </p>
        </div>

        {/* فیلتر برند */}
        {cars.length > 0 && (
          <div className="mb-12">
            <div className="scrollbar-hide flex justify-start gap-3 overflow-x-auto pb-3 sm:justify-center">

              {brands.map((brand) => {
                const active = selectedBrand === brand;

                return (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => setSelectedBrand(brand)}
                    aria-pressed={active}
                    className={`
                      flex-shrink-0
                      rounded-xl
                      border
                      px-5
                      py-3
                      font-semibold
                      transition-all
                      duration-300
                      ${
                        active
                          ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "border-white/10 bg-slate-900 text-gray-300 hover:border-blue-500/50 hover:text-blue-400"
                      }
                    `}
                  >
                    {brand}
                  </button>
                );
              })}

            </div>
          </div>
        )}

        {/* نمایش خودروها */}
        {cars.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-900 px-6 py-20 text-center">
            <p className="text-lg text-gray-400">
              هنوز خودرویی ثبت نشده است.
            </p>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-900 px-6 py-20 text-center">
            <p className="text-lg text-gray-400">
              خودرویی از این برند موجود نیست.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">

            {filteredCars.map((car) => {
              const status =
                statusInfo[car.status] ??
                statusInfo.AVAILABLE;

              const isSold = car.status === "SOLD";
              const isReserved = car.status === "RESERVED";

              return (
                <article
                  key={car.id}
                  className={`
                    overflow-hidden
                    rounded-3xl
                    border
                    bg-slate-900
                    shadow-xl
                    transition-all
                    duration-300
                    ${
                      isSold
                        ? "border-red-500/20"
                        : isReserved
                        ? "border-yellow-500/20"
                        : "border-blue-500/20 hover:border-blue-500/50"
                    }
                  `}
                >
                  {/* تصویر خودرو */}
                  <div className="relative h-60 overflow-hidden bg-slate-800 sm:h-64">

                    {/* دکمه علاقه‌مندی */}
                    <FavoriteButton carId={car.id} />

                    {/* تصویر */}
                    {car.image && car.image.startsWith("/") ? (
                      <Image
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={`
                          object-cover
                          transition-transform
                          duration-500
                          ${
                            isSold
                              ? "grayscale-[35%]"
                              : "hover:scale-105"
                          }
                        `}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-gray-500">
                          تصویر موجود نیست
                        </span>
                      </div>
                    )}

                    {/* برچسب وضعیت */}
                    <div
                      className={`
                        absolute
                        right-4
                        top-4
                        rounded-xl
                        px-4
                        py-2
                        text-sm
                        font-bold
                        shadow-lg
                        ${status.className}
                      `}
                    >
                      {status.label}
                    </div>

                    {/* لایه خودرو فروخته‌شده */}
                    {isSold && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                        <span className="rotate-[-8deg] rounded-2xl border-2 border-red-500 bg-slate-950/80 px-6 py-3 text-xl font-black text-red-400">
                          فروخته شد
                        </span>
                      </div>
                    )}

                  </div>

                  {/* اطلاعات خودرو */}
                  <div className="p-5 sm:p-6">

                    {/* نام و سال */}
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h3 className="text-xl font-bold text-white sm:text-2xl">
                        {car.brand} {car.model}
                      </h3>

                      <span className="whitespace-nowrap text-sm text-blue-400">
                        {car.year}
                      </span>
                    </div>

                    {/* توضیحات خودرو */}
                    {car.description && (
                      <p className="mb-4 line-clamp-2 text-sm leading-7 text-gray-400">
                        {car.description}
                      </p>
                    )}

                    {/* قیمت */}
                    <div className="mb-6 flex items-center justify-between gap-3">
                      <span className="text-gray-400">
                        قیمت
                      </span>

                      <span
                        className={`
                          text-lg
                          font-bold
                          sm:text-xl
                          ${
                            isSold
                              ? "text-gray-500 line-through"
                              : "text-blue-400"
                          }
                        `}
                      >
                        {car.price}
                      </span>
                    </div>

                    {/* مشاهده جزئیات */}
                    <Link
                      href={`/cars/${car.id}`}
                      className={`
                        block
                        w-full
                        rounded-xl
                        py-3
                        text-center
                        font-bold
                        text-white
                        transition
                        ${
                          isSold
                            ? "bg-slate-700 hover:bg-slate-600"
                            : isReserved
                            ? "bg-yellow-600 text-black hover:bg-yellow-500"
                            : "bg-blue-600 hover:bg-blue-500"
                        }
                      `}
                    >
                      {isSold
                        ? "مشاهده مشخصات"
                        : isReserved
                        ? "مشاهده خودرو"
                        : "مشاهده جزئیات"}
                    </Link>

                  </div>
                </article>
              );
            })}

          </div>
        )}

      </div>
    </section>
  );
}