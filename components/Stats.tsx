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
    <section className="py-24 bg-slate-950">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <FadeIn
                key={item.title}
                delay={index * 0.15}
              >
                <div className="rounded-3xl bg-slate-900 border border-white/10 p-8 text-center hover:border-blue-500 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(59,130,246,.3)]">

                  <div className="w-20 h-20 rounded-full bg-blue-600/20 mx-auto flex items-center justify-center mb-6">

                    <Icon
                      size={38}
                      className="text-blue-400"
                    />

                  </div>

                  <h3 className="text-5xl font-black text-blue-400">

                    <CountUp
                      end={item.value}
                      duration={2}
                      decimals={item.decimals ?? 0}
                    />

                    {item.suffix}

                  </h3>

                  <p className="text-gray-400 mt-4">
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