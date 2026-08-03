"use client";

import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

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
  return (
    <section className="relative h-[92vh]">

      <Swiper
        modules={[
          Navigation,
          Pagination,
          Autoplay,
          EffectFade,
        ]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        effect="fade"
        loop
        className="h-full"
      >
        {cars.map((car) => (
          <SwiperSlide key={car.id}>

            <div className="relative h-full">

              <Image
                src={car.image}
                alt={car.model}
                fill
                priority
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/55" />

              <div className="absolute inset-0 flex items-center">

                <div className="max-w-7xl mx-auto px-8 w-full">

                  <div className="max-w-2xl">

                    <p className="text-blue-400 text-xl font-bold mb-3">
                      AUTO COLD
                    </p>

                    <h1 className="text-6xl font-black leading-tight text-white">
                      {car.brand}
                      <br />
                      {car.model}
                    </h1>

                    <p className="mt-6 text-gray-300 text-xl">
                      Luxury Car Gallery
                    </p>

                    <p className="mt-6 text-3xl font-bold text-blue-400">
                      {car.price}
                    </p>

                    <div className="flex gap-5 mt-10">

                      <Link
                        href={`/cars/${car.id}`}
                        className="bg-blue-600 hover:bg-blue-500 transition px-8 py-4 rounded-xl font-bold"
                      >
                        مشاهده خودرو
                      </Link>

                      <Link
                        href="/cars"
                        className="border border-white/40 hover:bg-white/10 transition px-8 py-4 rounded-xl"
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