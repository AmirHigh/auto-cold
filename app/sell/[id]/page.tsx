import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import CarImageGallery from "@/components/CarImageGallery";
import DeleteMyCarAdButton from "@/components/DeleteMyCarAdButton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
params: Promise<{
id: string;
}>;
};

export default async function SellAdDetailsPage({ params }: Props) {
const { id } = await params;
const adId = Number(id);

if (!Number.isInteger(adId) || adId <= 0) {
notFound();
}

const ad = await prisma.carAd.findFirst({
where: {
id: adId,
status: "APPROVED",
},
include: {
images: {
orderBy: {
createdAt: "asc",
},
},
user: {
select: {
id: true,
name: true,
city: true,
},
},
},
});

if (!ad) {
notFound();
}

// تشخیص صاحب آگهی از طریق سشن
let isOwner = false;

try {
const cookieStore = await cookies();
const token = cookieStore.get("auto_cold_session")?.value;


if (token) {
  const payload = await verifyToken(token);
  const userId = Number(payload?.userId);

  isOwner =
    Number.isInteger(userId) &&
    userId > 0 &&
    userId === ad.userId;
}


} catch {
isOwner = false;
}

return ( <main
   dir="rtl"
   className="min-h-screen bg-slate-950 px-4 py-32 text-white sm:px-6"
 > <div className="mx-auto max-w-7xl"> <Link
       href="/sell"
       className="mb-8 inline-flex items-center gap-2 text-gray-400 transition hover:text-blue-400"
     > <span>→</span>
بازگشت به آگهی‌ها </Link>

```
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div>
        <CarImageGallery images={ad.images} title={ad.title} />
      </div>

      <section className="rounded-3xl border border-blue-500/20 bg-slate-900 p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 font-semibold text-blue-400">
              AUTO COLD
            </p>

            <h1 className="text-3xl font-bold sm:text-4xl">
              {ad.title}
            </h1>
          </div>

          <span className="whitespace-nowrap rounded-xl border border-green-500/20 bg-green-500/10 px-3 py-2 text-sm text-green-400">
            تأیید شده
          </span>
        </div>

        <div className="mb-6 rounded-2xl border border-white/10 bg-slate-950 p-5">
          <p className="mb-2 text-gray-500">قیمت خودرو</p>

          <p className="text-3xl font-bold text-blue-400">
            {ad.price}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-slate-950 p-4">
            <p className="text-sm text-gray-500">برند</p>
            <p className="mt-1 font-bold">{ad.brand}</p>
          </div>

          <div className="rounded-xl bg-slate-950 p-4">
            <p className="text-sm text-gray-500">مدل</p>
            <p className="mt-1 font-bold">{ad.model}</p>
          </div>

          <div className="rounded-xl bg-slate-950 p-4">
            <p className="text-sm text-gray-500">سال ساخت</p>
            <p className="mt-1 font-bold">{ad.year}</p>
          </div>

          <div className="rounded-xl bg-slate-950 p-4">
            <p className="text-sm text-gray-500">شهر</p>
            <p className="mt-1 font-bold">{ad.city}</p>
          </div>
        </div>

        {ad.description && (
          <div className="mb-7">
            <h2 className="mb-3 text-xl font-bold">
              توضیحات خودرو
            </h2>

            <p className="whitespace-pre-line leading-8 text-gray-400">
              {ad.description}
            </p>
          </div>
        )}

        <div className="border-t border-white/10 pt-6">
          <h2 className="mb-4 text-xl font-bold">
            اطلاعات فروشنده
          </h2>

          <div className="space-y-3 text-gray-400">
            <p>
              👤{" "}
              <span className="text-white">{ad.user.name}</span>
            </p>

            <p>
              📍{" "}
              <span className="text-white">
                {ad.user.city || ad.city}
              </span>
            </p>

            <p>
              📞{" "}
              <span className="text-white" dir="ltr">
                {ad.phone}
              </span>
            </p>
          </div>
        </div>

        <a
          href={`tel:${ad.phone}`}
          className="mt-7 block w-full rounded-xl bg-blue-600 py-4 text-center font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
        >
          📞 تماس با فروشنده
        </a>

        {isOwner && (
          <DeleteMyCarAdButton adId={ad.id} />
        )}

        <Link
          href="/sell"
          className="mt-3 block w-full rounded-xl border border-white/10 py-4 text-center font-semibold text-gray-300 transition hover:border-blue-500/50 hover:text-blue-400"
        >
          مشاهده سایر خودروها
        </Link>
      </section>
    </div>
  </div>
</main>


);
}
