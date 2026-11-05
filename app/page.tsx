import { prisma } from "@/lib/prisma";

import HeroSlider from "@/components/HeroSlider";
import Stats from "@/components/Stats";
import SearchBar from "@/components/SearchBar";
import FeaturedCars from "@/components/FeaturedCars";
import WhyUs from "@/components/WhyUs";
import CTA from "@/components/CTA";

import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // خودروهای اصلی گالری
  const cars = await prisma.car.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // محاسبه تعداد خودروهای آماده فروش از دیتابیس
  const availableCars = cars.filter(
    (car) => car.status === "AVAILABLE"
  ).length;

  // آگهی‌های تأییدشده کاربران
  const approvedAds = await prisma.carAd.findMany({
    where: {
      status: "APPROVED",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: true,
    },
  });

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      {/* اسلایدر اصلی */}
      {cars.length > 0 && <HeroSlider cars={cars} />}

      {/* آمار واقعی خودروهای موجود */}
      <Stats availableCars={availableCars} />

      {/* جست‌وجوی خودرو */}
      <SearchBar />

      {/* خودروهای اصلی گالری */}
      <FeaturedCars
        cars={cars.map((car) => ({
          ...car,
          status: (
            ["AVAILABLE", "RESERVED", "SOLD"].includes(car.status)
              ? car.status
              : "AVAILABLE"
          ) as "AVAILABLE" | "RESERVED" | "SOLD",
        }))}
      />

      {/* آگهی‌های تأییدشده کاربران */}
      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center sm:mb-10">
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-blue-400 sm:text-sm sm:tracking-[0.3em]">
              AUTO COLD MARKETPLACE
            </p>

            <h2 className="text-2xl font-black sm:text-3xl md:text-4xl">
              آگهی‌های تأییدشده کاربران
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-400 sm:mt-4 sm:text-base">
              خودروهایی که پس از بررسی مدیریت در سایت منتشر شده‌اند
            </p>
          </div>

          {approvedAds.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 text-center sm:rounded-3xl sm:p-10">
              <p className="text-sm leading-7 text-gray-400 sm:text-base">
                در حال حاضر آگهی تأییدشده‌ای برای نمایش وجود ندارد.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {approvedAds.map((ad) => {
                const firstImage = ad.images[0]?.image;

                return (
                  <article
                    key={ad.id}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition duration-300 hover:border-blue-500/50 sm:rounded-3xl"
                  >
                    {/* تصویر خودرو */}
                    <div className="relative h-52 bg-slate-800 sm:h-60">
                      {firstImage && firstImage.startsWith("/") ? (
                        <Image
                          src={firstImage}
                          alt={`${ad.brand} ${ad.model}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-gray-500">
                          تصویر موجود نیست
                        </div>
                      )}

                      <span className="absolute right-3 top-3 rounded-lg bg-green-500 px-3 py-2 text-xs font-bold text-white sm:right-4 sm:top-4 sm:rounded-xl sm:px-4 sm:text-sm">
                        تأیید شده
                      </span>
                    </div>

                    {/* اطلاعات خودرو */}
                    <div className="p-4 sm:p-6">
                      <h3 className="break-words text-lg font-bold sm:text-xl">
                        {ad.brand} {ad.model}
                      </h3>

                      <p className="mt-2 break-words text-sm leading-6 text-gray-400">
                        {ad.title}
                      </p>

                      <p className="mt-3 text-sm text-gray-400">
                        سال ساخت: {ad.year}
                      </p>

                      <p className="mt-4 break-words text-lg font-bold text-blue-400 sm:text-xl">
                        {ad.price}
                      </p>

                      {ad.city && (
                        <p className="mt-3 text-sm text-gray-400">
                          شهر: {ad.city}
                        </p>
                      )}

                      {ad.description && (
                        <p className="mt-4 line-clamp-3 break-words text-sm leading-7 text-gray-400">
                          {ad.description}
                        </p>
                      )}

                      <div className="mt-5 rounded-xl border border-white/10 bg-slate-800 p-3 sm:p-4">
                        <p className="text-xs text-gray-400 sm:text-sm">
                          شماره تماس فروشنده
                        </p>

                        <p
                          className="mt-2 break-all text-left font-bold"
                          dir="ltr"
                        >
                          {ad.phone}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* چرا AUTO COLD */}
      <WhyUs />

      {/* دعوت به ثبت سفارش */}
      <CTA />
    </main>
  );
}