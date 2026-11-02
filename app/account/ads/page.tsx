import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

type Props = {
searchParams: Promise<{
success?: string;
}>;
};

type CarAdImage = {
id: number;
image: string;
carAdId: number;
};

type CarAdItem = {
id: number;
title: string;
brand: string;
model: string;
year: number;
price: string;
description: string | null;
phone: string;
city: string;
status: string;
userId: number;
createdAt: Date;
updatedAt: Date;
images: CarAdImage[];
};

function getStatusText(status: string) {
switch (status) {
case "APPROVED":
return "تأیید شده";


case "REJECTED":
  return "رد شده";

case "PENDING":
default:
  return "در انتظار بررسی";


}
}

function getStatusClass(status: string) {
switch (status) {
case "APPROVED":
return "bg-green-500/10 text-green-400 border-green-500/20";


case "REJECTED":
  return "bg-red-500/10 text-red-400 border-red-500/20";

case "PENDING":
default:
  return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";


}
}

export default async function MyAdsPage({
searchParams,
}: Props) {
const user = await getCurrentUser();

if (!user) {
redirect("/login");
}

const { success } = await searchParams;

const ads: CarAdItem[] = await prisma.carAd.findMany({
where: {
userId: user.id,
},
include: {
images: true,
},
orderBy: {
createdAt: "desc",
},
});

return ( <main
   dir="rtl"
   className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 py-32"
 > <div className="max-w-6xl mx-auto">
{/* Header */} <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10"> <div> <p className="text-blue-400 font-bold mb-2">
AUTO COLD </p>

```
        <h1 className="text-4xl font-bold">
          آگهی‌های من
        </h1>

        <p className="text-gray-400 mt-3">
          مدیریت آگهی‌های ثبت‌شده توسط شما
        </p>
      </div>

      <Link
        href="/sell"
        className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition text-center"
      >
        + ثبت آگهی جدید
      </Link>
    </div>

    {/* Success */}
    {success === "submitted" && (
      <div className="mb-8 rounded-2xl border border-green-500/20 bg-green-500/10 p-5 text-green-400">
        آگهی شما با موفقیت ثبت شد و برای بررسی ارسال گردید. ✅
      </div>
    )}

    {/* Ads */}
    {ads.length === 0 ? (
      <div className="bg-slate-900 border border-white/10 rounded-3xl p-12 text-center">
        <div className="text-5xl mb-5">
          🚗
        </div>

        <h2 className="text-2xl font-bold mb-3">
          هنوز آگهی‌ای ثبت نکرده‌اید
        </h2>

        <p className="text-gray-400 mb-7">
          اولین خودروی خود را برای فروش ثبت کنید.
        </p>

        <Link
          href="/sell"
          className="inline-block bg-blue-600 hover:bg-blue-500 px-7 py-3 rounded-xl font-bold transition"
        >
          ثبت اولین آگهی
        </Link>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.map((ad) => {
          const image = ad.images[0]?.image || null;

          return (
            <div
              key={ad.id}
              className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden"
            >
              {/* Image */}
              <div className="h-52 bg-slate-800 flex items-center justify-center">
                {image ? (
                  <img
                    src={image}
                    alt={ad.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">
                    تصویر موجود نیست
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h2 className="text-xl font-bold">
                    {ad.title}
                  </h2>

                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {ad.year}
                  </span>
                </div>

                <p className="text-gray-400 mb-2">
                  {ad.brand} {ad.model}
                </p>

                <p className="text-blue-400 font-bold text-lg mb-5">
                  {ad.price}
                </p>

                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`border rounded-lg px-3 py-2 text-sm ${getStatusClass(
                      ad.status
                    )}`}
                  >
                    {getStatusText(ad.status)}
                  </span>

                  <span className="text-gray-500 text-sm">
                    {ad.city}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
</main>


);
}
