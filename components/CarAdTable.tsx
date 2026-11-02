"use client";

import { useState } from "react";
import {
approveCarAd,
rejectCarAd,
deleteCarAd,
} from "@/app/admin/actions";

type CarAd = {
id: number;
title: string;
brand: string;
model: string;
year: number;
price: string;
phone: string;
city: string;
status: string;
createdAt: Date;
user: {
name: string;
email: string;
};
images: {
id: number;
image: string;
}[];
};

type Props = {
ads: CarAd[];
};

export default function CarAdTable({ ads }: Props) {
const [loadingId, setLoadingId] = useState<number | null>(null);

async function handleApprove(id: number) {
try {
setLoadingId(id);
await approveCarAd(id);
} catch (error) {
console.error(error);
alert("تأیید آگهی انجام نشد.");
} finally {
setLoadingId(null);
}
}

async function handleReject(id: number) {
try {
setLoadingId(id);
await rejectCarAd(id);
} catch (error) {
console.error(error);
alert("رد آگهی انجام نشد.");
} finally {
setLoadingId(null);
}
}

async function handleDelete(id: number) {
const confirmed = window.confirm(
"آیا مطمئنی می‌خواهی این آگهی را برای همیشه حذف کنی؟ این عملیات قابل بازگشت نیست."
);


if (!confirmed) return;

try {
  setLoadingId(id);

  const result = await deleteCarAd(id);

  if (!result.success) {
    alert(result.message || "حذف آگهی انجام نشد.");
    return;
  }

  alert("آگهی با موفقیت حذف شد.");
} catch (error) {
  console.error("DELETE CAR AD ERROR:", error);
  alert("هنگام حذف آگهی خطایی رخ داد.");
} finally {
  setLoadingId(null);
}


}

if (ads.length === 0) {
return ( <div className="rounded-2xl border border-white/10 bg-slate-900 p-8 text-center"> <p className="text-gray-400">
آگهی‌ای در این بخش وجود ندارد. </p> </div>
);
}

return ( <div className="space-y-4">
{ads.map((ad) => {
const image = ad.images[0]?.image || null;
const isLoading = loadingId === ad.id;
const isPending = ad.status === "PENDING";


    return (
      <article
        key={ad.id}
        className="rounded-2xl border border-white/10 bg-slate-900 p-4 sm:p-5"
      >
        <div className="flex flex-col gap-5 lg:flex-row">
          {/* تصویر خودرو */}
          <div className="h-44 w-full flex-shrink-0 overflow-hidden rounded-xl bg-slate-800 lg:w-52">
            {image && image.startsWith("/") ? (
              <img
                src={image}
                alt={ad.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-500">
                بدون تصویر
              </div>
            )}
          </div>

          {/* اطلاعات آگهی */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="break-words text-xl font-bold text-white">
                  {ad.title}
                </h3>

                <p className="mt-1 text-gray-400">
                  {ad.brand} {ad.model} • {ad.year}
                </p>

                <p className="mt-2 break-all text-sm text-gray-500">
                  {ad.user.email}
                </p>
              </div>

              <span
                className={`w-fit flex-shrink-0 rounded-lg border px-3 py-1 text-sm ${
                  ad.status === "APPROVED"
                    ? "border-green-500/20 bg-green-500/10 text-green-400"
                    : ad.status === "REJECTED"
                    ? "border-red-500/20 bg-red-500/10 text-red-400"
                    : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                }`}
              >
                {ad.status === "APPROVED"
                  ? "تأیید شده"
                  : ad.status === "REJECTED"
                  ? "رد شده"
                  : "در انتظار بررسی"}
              </span>
            </div>

            {/* مشخصات */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg bg-slate-950 p-3">
                <p className="text-xs text-gray-500">قیمت</p>
                <p className="mt-1 break-words font-bold text-blue-400">
                  {ad.price}
                </p>
              </div>

              <div className="rounded-lg bg-slate-950 p-3">
                <p className="text-xs text-gray-500">شهر</p>
                <p className="mt-1 break-words text-white">{ad.city}</p>
              </div>

              <div className="rounded-lg bg-slate-950 p-3">
                <p className="text-xs text-gray-500">فروشنده</p>
                <p className="mt-1 break-words text-white">
                  {ad.user.name}
                </p>
              </div>

              <div className="rounded-lg bg-slate-950 p-3">
                <p className="text-xs text-gray-500">تماس</p>
                <p className="mt-1 break-words text-white">
                  {ad.phone}
                </p>
              </div>
            </div>

            {/* عملیات مدیریتی */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              {isPending && (
                <>
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleApprove(ad.id)}
                    className="flex-1 rounded-xl bg-green-600 py-3 font-bold transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLoading ? "در حال پردازش..." : "✓ تأیید آگهی"}
                  </button>

                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleReject(ad.id)}
                    className="flex-1 rounded-xl bg-red-600 py-3 font-bold transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLoading ? "در حال پردازش..." : "✕ رد آگهی"}
                  </button>
                </>
              )}

              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleDelete(ad.id)}
                className="flex-1 rounded-xl bg-red-900 py-3 font-bold transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "در حال پردازش..." : "🗑️ حذف دائمی"}
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  })}
</div>


);
}
