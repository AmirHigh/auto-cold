import { prisma } from "@/lib/prisma";
import CarTable from "@/components/CarTable";
import CarAdTable from "@/components/CarAdTable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPage() {
const [cars, pendingAds, approvedAds, rejectedAds, totalAds] =
await Promise.all([
prisma.car.findMany({
orderBy: { createdAt: "desc" },
}),


  prisma.carAd.findMany({
    where: { status: "PENDING" },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      images: true,
    },
    orderBy: { createdAt: "desc" },
  }),

  prisma.carAd.findMany({
    where: { status: "APPROVED" },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      images: true,
    },
    orderBy: { createdAt: "desc" },
  }),

  prisma.carAd.findMany({
    where: { status: "REJECTED" },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      images: true,
    },
    orderBy: { createdAt: "desc" },
  }),

  prisma.carAd.count(),
]);


return ( <main
   dir="rtl"
   className="min-h-screen bg-slate-950 px-4 py-32 text-white sm:px-6"
 > <div className="mx-auto max-w-7xl">
{/* Header */} <div className="mb-10"> <p className="mb-2 font-bold text-blue-400">AUTO COLD</p>

```
      <h1 className="text-4xl font-bold">پنل مدیریت</h1>

      <p className="mt-2 text-gray-400">
        مدیریت خودروها و آگهی‌های کاربران
      </p>
    </div>

    {/* Stats */}
    <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <div className="rounded-2xl border border-blue-500/20 bg-slate-900 p-5">
        <p className="text-sm text-gray-500">خودروهای سایت</p>
        <p className="mt-2 text-3xl font-bold text-blue-400">
          {cars.length}
        </p>
      </div>

      <div className="rounded-2xl border border-yellow-500/20 bg-slate-900 p-5">
        <p className="text-sm text-gray-500">در انتظار بررسی</p>
        <p className="mt-2 text-3xl font-bold text-yellow-400">
          {pendingAds.length}
        </p>
      </div>

      <div className="rounded-2xl border border-green-500/20 bg-slate-900 p-5">
        <p className="text-sm text-gray-500">تأیید شده</p>
        <p className="mt-2 text-3xl font-bold text-green-400">
          {approvedAds.length}
        </p>
      </div>

      <div className="rounded-2xl border border-red-500/20 bg-slate-900 p-5">
        <p className="text-sm text-gray-500">رد شده</p>
        <p className="mt-2 text-3xl font-bold text-red-400">
          {rejectedAds.length}
        </p>
      </div>
    </div>

    {/* Pending Ads */}
    <section className="mb-12">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">
            آگهی‌های در انتظار بررسی
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            آگهی‌ها را بررسی و تأیید یا رد کنید.
          </p>
        </div>

        <span className="whitespace-nowrap rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-3 py-2 text-yellow-400">
          {pendingAds.length} آگهی
        </span>
      </div>

      <CarAdTable ads={pendingAds} />
    </section>

    {/* Approved Ads */}
    <section className="mb-12">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">
            آگهی‌های تأییدشده
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            آگهی‌های منتشرشده کاربران؛ امکان حذف دائمی از این بخش وجود دارد.
          </p>
        </div>

        <span className="whitespace-nowrap rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-2 text-green-400">
          {approvedAds.length} آگهی
        </span>
      </div>

      <CarAdTable ads={approvedAds} />
    </section>

    {/* Rejected Ads */}
    <section className="mb-12">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">
            آگهی‌های ردشده
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            آگهی‌های ردشده نیز از این بخش قابل حذف هستند.
          </p>
        </div>

        <span className="whitespace-nowrap rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-red-400">
          {rejectedAds.length} آگهی
        </span>
      </div>

      <CarAdTable ads={rejectedAds} />
    </section>

    {/* Main Cars */}
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-bold">خودروهای سایت</h2>
        <p className="mt-1 text-sm text-gray-500">
          مدیریت خودروهای اصلی گالری AUTO COLD
        </p>
      </div>

      <CarTable cars={cars} />
    </section>
  </div>
</main>


);
}
