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
  return (
    <section
      className="
        relative
        h-[72vh]
        min-h-[520px]
        sm:h-[78vh]
        sm:min-h-[580px]
        md:h-[92vh]
        md:min-h-0
      "
    >
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
            <div className="relative h-full w-full bg-slate-950">

              {/* =========================
                  CAR IMAGE
                  ========================= */}

              <Image
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                fill
                priority
                sizes="100vw"
                className="
                  object-contain
                  object-center
                  md:object-cover
                "
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50 md:bg-black/55" />

              {/* =========================
                  CONTENT
                  ========================= */}

              <div className="absolute inset-0 flex items-center">
                <div
                  className="
                    w-full
                    max-w-7xl
                    mx-auto
                    px-5
                    sm:px-8
                    lg:px-8
                  "
                >
                  <div
                    className="
                      max-w-2xl
                      pt-16
                      sm:pt-12
                      md:pt-0
                    "
                  >

                    {/* AUTO COLD */}
                    <p
                      className="
                        text-blue-400
                        text-sm
                        sm:text-lg
                        md:text-xl
                        font-bold
                        mb-2
                        sm:mb-3
                      "
                    >
                      AUTO COLD
                    </p>

                    {/* CAR NAME */}
                    <h1
                      className="
                        text-4xl
                        sm:text-5xl
                        md:text-6xl
                        lg:text-7xl
                        font-black
                        leading-[1.05]
                        sm:leading-tight
                        text-white
                        break-words
                        max-w-[90vw]
                        sm:max-w-2xl
                      "
                    >
                      {car.brand}
                      <br />
                      <span>{car.model}</span>
                    </h1>

                    {/* SUBTITLE */}
                    <p
                      className="
                        mt-3
                        sm:mt-5
                        md:mt-6
                        text-gray-300
                        text-sm
                        sm:text-lg
                        md:text-xl
                      "
                    >
                      Luxury Car Gallery
                    </p>

                    {/* PRICE */}
                    <p
                      className="
                        mt-3
                        sm:mt-5
                        md:mt-6
                        text-2xl
                        sm:text-3xl
                        font-bold
                        text-blue-400
                      "
                    >
                      {car.price}
                    </p>

                    {/* BUTTONS */}
                    <div
                      className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-3
                        sm:gap-5
                        mt-6
                        sm:mt-8
                        md:mt-10
                        w-full
                        sm:w-auto
                      "
                    >
                      <Link
                        href={`/cars/${car.id}`}
                        className="
                          flex
                          items-center
                          justify-center
                          bg-blue-600
                          hover:bg-blue-500
                          transition
                          px-6
                          sm:px-8
                          py-3
                          sm:py-4
                          rounded-xl
                          font-bold
                          text-white
                          w-full
                          sm:w-auto
                        "
                      >
                        مشاهده خودرو
                      </Link>

                      <Link
                        href="/cars"
                        className="
                          flex
                          items-center
                          justify-center
                          border
                          border-white/40
                          hover:bg-white/10
                          transition
                          px-6
                          sm:px-8
                          py-3
                          sm:py-4
                          rounded-xl
                          text-white
                          w-full
                          sm:w-auto
                        "
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