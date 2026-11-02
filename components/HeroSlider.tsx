
"use client";

import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: string;
  image: string;
};

type Props = {
  cars: Car[];
};

export default function HeroSlider({ cars }: Props) {
  if (cars.length === 0) return null;

  return (
    <section
      aria-label="خودروهای منتخب AUTO COLD"
      className="relative h-[calc(100svh-72px)] min-h-[560px] max-h-[850px] overflow-hidden bg-slate-950 sm:h-[calc(100svh-80px)] sm:min-h-[600px] md:h-[calc(100svh-88px)] md:min-h-[620px] md:max-h-[900px]"
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation
        pagination={{ clickable: true }}
        autoplay={
          cars.length > 1
            ? {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={cars.length > 1}
        speed={650}
        className="h-full w-full"
      >
        {cars.map((car, index) => (
          <SwiperSlide key={car.id}>
            <div className="relative h-full w-full overflow-hidden bg-slate-950">
              <Image
                src={car.image}
                alt={`${car.brand} ${car.model} مدل ${car.year}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-contain object-center md:object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/45 to-black/25 md:bg-gradient-to-r md:from-slate-950/90 md:via-slate-950/55 md:to-black/20" />

              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-10">
                  <div className="max-w-2xl pt-4 sm:pt-0">
                    <p className="mb-2 text-xs font-bold tracking-[0.22em] text-blue-400 sm:mb-3 sm:text-sm md:text-lg">
                      AUTO COLD
                    </p>

                    <h1 className="max-w-full break-words text-3xl font-black leading-tight text-white min-[380px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                      {car.brand}
                      <br />
                      <span>{car.model}</span>
                    </h1>

                    <p className="mt-3 text-sm text-gray-300 sm:mt-5 sm:text-base md:text-xl">
                      Luxury Car Gallery
                    </p>

                    <p className="mt-4 break-words text-xl font-bold text-blue-400 sm:mt-5 sm:text-2xl md:text-3xl">
                      {car.price}
                    </p>

                    <div className="mt-6 flex w-full flex-col gap-3 min-[480px]:flex-row sm:mt-8 sm:w-auto sm:gap-4 md:mt-10">
                      <Link
                        href={`/cars/${car.id}`}
                        className="flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500 active:scale-[0.98] min-[480px]:w-auto sm:px-7 sm:py-4 sm:text-base"
                      >
                        مشاهده خودرو
                      </Link>

                      <Link
                        href="/cars"
                        className="flex min-h-12 w-full items-center justify-center rounded-xl border border-white/30 bg-black/20 px-5 py-3 text-center text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-white/10 active:scale-[0.98] min-[480px]:w-auto sm:px-7 sm:py-4 sm:text-base"
                      >
                        مشاهده همه خودروها
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

