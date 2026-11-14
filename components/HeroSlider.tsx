"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectFade,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

type Car = {
  id: number | string;
  brand: string;
  model: string;
  year: number;
  price: string | number;
  image: string | null;

  mileage?: number | string | null;
  color?: string | null;
  engineType?: string | null;
  engineVolume?: string | number | null;
  cylinders?: string | number | null;
  horsepower?: string | number | null;
  transmission?: string | null;
  fuelType?: string | null;
};

type Props = {
  cars: Car[];
};

export default function HeroSlider({ cars }: Props) {
  if (!cars || cars.length === 0) return null;

  const formatPrice = (price: string | number) => {
    const value = String(price).trim();

    if (!value || value === "0") return "استعلام قیمت";

    const numericValue = Number(value.replace(/,/g, ""));

    return Number.isFinite(numericValue)
      ? numericValue.toLocaleString("en-US") + " $"
      : value;
  };

  const formatMileage = (value: number | string) => {
    const numericValue = Number(value);

    return Number.isFinite(numericValue)
      ? numericValue.toLocaleString("en-US") + " km"
      : value;
  };

  const getSpecifications = (car: Car) => {
    return [
      {
        label: "سال ساخت",
        value: car.year ? String(car.year) : null,
        icon: "📅",
      },
      {
        label: "کارکرد",
        value:
          car.mileage !== undefined && car.mileage !== null
            ? formatMileage(car.mileage)
            : null,
        icon: "🛣️",
      },
      {
        label: "موتور",
        value: car.engineType || null,
        icon: "⚙️",
      },
      {
        label: "حجم موتور",
        value: car.engineVolume ? String(car.engineVolume) : null,
        icon: "🔧",
      },
      {
        label: "قدرت موتور",
        value: car.horsepower ? `${car.horsepower} HP` : null,
        icon: "⚡",
      },
      {
        label: "گیربکس",
        value: car.transmission || null,
        icon: "🚘",
      },
      {
        label: "سوخت",
        value: car.fuelType || null,
        icon: "⛽",
      },
      {
        label: "رنگ",
        value: car.color || null,
        icon: "🎨",
      },
    ].filter((item) => item.value);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#020817]">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={cars.length > 1}
        speed={850}
        className="heroSwiper w-full"
      >
        {cars.map((car, index) => {
          const specifications = getSpecifications(car);

          return (
            <SwiperSlide key={car.id}>
              <div className="relative flex min-h-[unset] flex-col overflow-hidden bg-gradient-to-br from-[#102748] via-[#07152d] to-[#020817] md:min-h-[650px] md:flex-row-reverse md:items-center">

                {/* Background Image */}
                {car.image && (
                  <div className="pointer-events-none absolute inset-0">
                    <Image
                      src={car.image}
                      alt=""
                      fill
                      priority={index === 0}
                      unoptimized
                      sizes="100vw"
                      className="scale-110 object-cover opacity-[0.12] blur-3xl"
                    />

                    <div className="absolute inset-0 bg-gradient-to-br from-[#071a35]/80 via-[#020817]/80 to-[#020817]/95" />
                  </div>
                )}

                {/* Decorative Lights */}
                <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-[100px]" />

                <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[110px]" />

                {/* Car Image */}
                <div className="relative z-10 flex h-[360px] w-full items-center justify-center overflow-hidden px-5 pt-6 sm:h-[430px] md:h-[650px] md:w-[52%] md:px-6 md:py-10">

                  {/* Ground Light */}
                  <div className="pointer-events-none absolute bottom-10 left-[10%] right-[10%] h-24 rounded-full bg-cyan-400/[0.12] blur-[65px] md:bottom-16" />

                  {/* Image Frame */}
                  {car.image ? (
                    <div className="relative h-[88%] max-h-[390px] w-full max-w-[580px] overflow-hidden rounded-[24px] border border-cyan-300/20 bg-white/[0.025] shadow-[0_0_40px_rgba(34,211,238,0.08)] sm:rounded-[30px] md:h-[78%] md:max-h-[470px] md:rounded-[34px]">
                      <div className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] shadow-[inset_0_0_35px_rgba(34,211,238,0.08)]" />

                      <Image
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        fill
                        priority={index === 0}
                        unoptimized
                        sizes="(max-width: 768px) 95vw, 52vw"
                        className="object-contain p-2 drop-shadow-[0_20px_35px_rgba(0,0,0,0.55)]"
                      />
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      تصویر خودرو موجود نیست
                    </div>
                  )}

                  {/* Shadow Under Car */}
                  <div className="pointer-events-none absolute bottom-5 left-[15%] right-[15%] z-20 h-10 rounded-full bg-black/50 blur-[30px]" />

                  {/* Icy Reflection */}
                  <div className="pointer-events-none absolute bottom-3 left-[22%] right-[22%] z-20 h-7 rounded-full bg-cyan-300/10 blur-[30px]" />
                </div>

                {/* Car Information */}
                <div className="relative z-30 flex w-full flex-col justify-center px-5 pb-20 pt-4 text-right sm:px-10 md:w-[48%] md:px-8 md:py-12 lg:px-14">

                  {/* Brand */}
                  <div className="mb-5 flex items-center gap-2">
                    <span className="h-[2px] w-9 bg-cyan-400" />

                    <span className="text-xs font-bold tracking-[3px] text-cyan-400 sm:text-sm">
                      AUTO COLD
                    </span>

                    <span className="text-xs text-slate-400">
                      | LUXURY CAR GALLERY
                    </span>
                  </div>

                  {/* Car Name */}
                  <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                    {car.brand}

                    <span className="mt-2 block text-cyan-400">
                      {car.model}
                    </span>
                  </h2>

                  {/* Year */}
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
                      مدل {car.year}
                    </span>

                    <span className="text-xs text-slate-400">
                      انتخابی خاص برای سلیقه‌های خاص
                    </span>
                  </div>

                  {/* Specifications */}
                  {specifications.length > 0 && (
                    <div className="mt-7">
                      <div className="mb-4 flex items-center gap-2">
                        <span className="h-5 w-1 rounded-full bg-cyan-400" />

                        <h3 className="text-sm font-bold text-white sm:text-base">
                          مشخصات خودرو
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {specifications.slice(0, 6).map((item) => (
                          <div
                            key={item.label}
                            className="flex min-h-[68px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-3 py-3 backdrop-blur-xl transition duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/[0.07]"
                          >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-lg">
                              {item.icon}
                            </span>

                            <div className="min-w-0">
                              <p className="text-[10px] text-slate-400 sm:text-xs">
                                {item.label}
                              </p>

                              <p className="mt-1 truncate text-xs font-bold text-white sm:text-sm">
                                {item.value}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price */}
                  <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-gradient-to-l from-cyan-400/10 to-transparent p-4">
                    <p className="text-xs text-slate-400">
                      قیمت خودرو
                    </p>

                    <p className="mt-2 text-2xl font-black text-cyan-300 sm:text-3xl">
                      {formatPrice(car.price)}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={`/cars/${car.id}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-4 text-sm font-black text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:-translate-y-1 hover:shadow-cyan-500/40"
                    >
                      مشاهده جزئیات خودرو
                      <span>←</span>
                    </Link>

                    <Link
                      href="/cars"
                      className="flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] px-6 py-4 text-sm font-bold text-white transition hover:border-cyan-400/50 hover:bg-white/10"
                    >
                      همه خودروها
                    </Link>
                  </div>

                  <p className="mt-5 text-center text-[10px] text-slate-500 md:text-right">
                    AUTO COLD — EXPERIENCE LUXURY
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <style jsx global>{`
        .heroSwiper {
          width: 100%;
          overflow: hidden;
        }

        .heroSwiper .swiper-pagination {
          bottom: 14px !important;
        }

        .heroSwiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: white;
          opacity: 0.45;
          transition: 0.3s;
        }

        .heroSwiper .swiper-pagination-bullet-active {
          width: 25px;
          border-radius: 8px;
          background: #22d3ee;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}