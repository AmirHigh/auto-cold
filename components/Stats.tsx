"use client";

import { Car, Users, ShoppingBag, Star } from "lucide-react";
import FadeIn from "./FadeIn";
import CountUp from "react-countup";

export default function Stats() {
  const stats = [
    {
      title: "خودرو موجود",
      value: 250,
      suffix: "+",
      icon: Car,
    },
    {
      title: "مشتری راضی",
      value: 1200,
      suffix: "+",
      icon: Users,
    },
    {
      title: "سفارش ثبت شده",
      value: 500,
      suffix: "+",
      icon: ShoppingBag,
    },
    {
      title: "رضایت مشتری",
      value: 4.9,
      suffix: "",
      decimals: 1,
      icon: Star,
    },
  ];

  return (
    <section className="py-14 sm:py-18 md:py-24 bg-slate-950">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-8">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <FadeIn
                key={item.title}
                delay={index * 0.15}
              >
                <div
                  className="
                    h-full
                    rounded-2xl sm:rounded-3xl
                    bg-slate-900
                    border border-white/10
                    p-4 sm:p-6 md:p-8
                    text-center
                    hover:border-blue-500
                    transition duration-300
                    hover:-translate-y-1
                    md:hover:-translate-y-2
                    hover:shadow-[0_0_35px_rgba(59,130,246,.3)]
                  "
                >

                  {/* Icon */}
                  <div
                    className="
                      w-12 h-12
                      sm:w-16 sm:h-16
                      md:w-20 md:h-20
                      rounded-full
                      bg-blue-600/20
                      mx-auto
                      flex items-center justify-center
                      mb-4 sm:mb-5 md:mb-6
                    "
                  >
                    <Icon
                      size={24}
                      className="text-blue-400 sm:w-7 sm:h-7 md:w-[38px] md:h-[38px]"
                    />
                  </div>

                  {/* Number */}
                  <h3
                    className="
                      text-3xl
                      sm:text-4xl
                      md:text-5xl
                      font-black
                      text-blue-400
                      leading-none
                    "
                  >
                    <CountUp
                      end={item.value}
                      duration={2}
                      decimals={item.decimals ?? 0}
                    />

                    {item.suffix}
                  </h3>

                  {/* Title */}
                  <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-3 sm:mt-4">
                    {item.title}
                  </p>

                </div>
              </FadeIn>
            );
          })}

        </div>

      </div>

    </section>
  );
}