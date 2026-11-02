import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SellPage() {
  const ads = await prisma.carAd.findMany({
    where: {
      status: "APPROVED",
    },
    include: {
      images: true,
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 py-32"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-blue-400 font-bold mb-3">
            AUTO COLD
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            آگهی‌های فروش خودرو
          </h1>

          <p className="text-gray-400">
            خودروهای تأییدشده کاربران را مشاهده کنید
          </p>
        </div>

        {/* Create Ad */}
        <div className="flex justify-center mb-12">
          <Link
            href="/sell/create"
            className="bg-blue-600 hover:bg-blue-500 px-7 py-4 rounded-xl font-bold transition shadow-lg shadow-blue-600/20"
          >
            + ثبت آگهی فروش خودرو
          </Link>
        </div>

        {/* Ads */}
        {ads.length === 0 ? (
          <div className="text-center bg-slate-900 border border-white/10 rounded-3xl p-12">
            <div className="text-5xl mb-5">
              🚗
            </div>

            <h2 className="text-2xl font-bold mb-3">
              هنوز آگهی تأییدشده‌ای وجود ندارد
            </h2>

            <p className="text-gray-400 mb-6">
              بعد از تأیید آگهی توسط مدیر، خودرو در این صفحه نمایش داده می‌شود.
            </p>

            <Link
              href="/sell/create"
              className="inline-block bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition"
            >
              ثبت آگهی
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

            {ads.map((ad) => {
              const image = ad.images[0]?.image || null;

              const validImage =
                image && image.startsWith("/")
                  ? image
                  : null;

              return (
                <article
                  key={ad.id}
                  className="bg-slate-900 border border-blue-500/20 rounded-3xl overflow-hidden hover:border-blue-500/50 transition shadow-xl"
                >

                  {/* Image */}
                  <div className="relative h-60 bg-slate-800">

                    {validImage ? (
                      <Image
                        src={validImage}
                        alt={ad.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                        <span className="text-4xl">
                          🚗
                        </span>

                        <span className="text-gray-500 text-sm">
                          تصویر موجود نیست
                        </span>
                      </div>
                    )}

                  </div>

                  {/* Info */}
                  <div className="p-6">

                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h2 className="text-xl font-bold">
                        {ad.title}
                      </h2>

                      <span className="text-blue-400 text-sm whitespace-nowrap">
                        {ad.year}
                      </span>
                    </div>

                    <p className="text-gray-400 mb-3">
                      {ad.brand} {ad.model}
                    </p>

                    <div className="flex items-center justify-between mb-5">
                      <span className="text-gray-500">
                        قیمت
                      </span>

                      <span className="text-xl font-bold text-blue-400">
                        {ad.price}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-500 mb-5">
                      <div>
                        📍 {ad.city}
                      </div>

                      <div>
                        📞 {ad.phone}
                      </div>

                      <div>
                        👤 {ad.user.name}
                      </div>
                    </div>

                    <Link
                      href={`/sell/${ad.id}`}
                      className="block w-full text-center bg-blue-600 hover:bg-blue-500 rounded-xl py-3 font-bold transition"
                    >
                      مشاهده آگهی
                    </Link>

                  </div>
                </article>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}