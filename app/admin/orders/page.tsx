import { prisma } from "@/lib/prisma";

const statusLabels: Record<string, string> = {
  NEW: "جدید",
  REVIEWING: "در حال بررسی",
  APPROVED: "تأیید شده",
  CANCELLED: "لغو شده",
};

const statusStyles: Record<string, string> = {
  NEW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  REVIEWING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  APPROVED: "bg-green-500/10 text-green-400 border-green-500/20",
  CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      car: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24">
      <div className="max-w-7xl mx-auto px-6 pb-20">

        <div className="mb-10">
          <p className="text-blue-400 font-bold mb-2">
            AUTO COLD
          </p>

          <h1 className="text-4xl font-black">
            مدیریت سفارش‌ها
          </h1>

          <p className="text-gray-400 mt-3">
            مشاهده و مدیریت سفارش‌های ثبت‌شده
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-12 text-center">
            <h2 className="text-2xl font-bold">
              هنوز سفارشی ثبت نشده است
            </h2>

            <p className="text-gray-400 mt-3">
              وقتی مشتری سفارشی ثبت کند، اطلاعات آن اینجا نمایش داده می‌شود.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-900">
            <table className="w-full min-w-[1100px]">

              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-right">
                  <th className="p-5">مشتری</th>
                  <th className="p-5">خودرو</th>
                  <th className="p-5">تلفن</th>
                  <th className="p-5">ایمیل</th>
                  <th className="p-5">پیام</th>
                  <th className="p-5">وضعیت</th>
                  <th className="p-5">تاریخ</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => {
                  const status = order.status || "NEW";

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-white/5 hover:bg-slate-800/60 transition"
                    >
                      <td className="p-5 font-bold">
                        {order.fullName}
                      </td>

                      <td className="p-5">
                        <div>
                          <p className="font-bold">
                            {order.car.brand} {order.car.model}
                          </p>

                          <p className="text-sm text-gray-500">
                            {order.car.year}
                          </p>
                        </div>
                      </td>

                      <td className="p-5 text-gray-300">
                        {order.phone}
                      </td>

                      <td className="p-5 text-gray-300">
                        {order.email || "-"}
                      </td>

                      <td className="p-5 text-gray-400 max-w-xs">
                        {order.message || "-"}
                      </td>

                      <td className="p-5">
                        <div className="flex flex-col gap-3">

                          <span
                            className={`inline-flex w-fit rounded-full border px-3 py-1 text-sm font-bold ${
                              statusStyles[status] ||
                              statusStyles.NEW
                            }`}
                          >
                            {statusLabels[status] || "جدید"}
                          </span>

                          <div className="flex gap-2">
                            <form
                              action={async () => {
                                "use server";

                                await prisma.order.update({
                                  where: {
                                    id: order.id,
                                  },
                                  data: {
                                    status: "REVIEWING",
                                  },
                                });
                              }}
                            >
                              <button
                                type="submit"
                                className="rounded-lg bg-yellow-500/10 border border-yellow-500/20 px-3 py-2 text-xs font-bold text-yellow-400 hover:bg-yellow-500/20 transition"
                              >
                                بررسی
                              </button>
                            </form>

                            <form
                              action={async () => {
                                "use server";

                                await prisma.order.update({
                                  where: {
                                    id: order.id,
                                  },
                                  data: {
                                    status: "APPROVED",
                                  },
                                });
                              }}
                            >
                              <button
                                type="submit"
                                className="rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-2 text-xs font-bold text-green-400 hover:bg-green-500/20 transition"
                              >
                                تأیید
                              </button>
                            </form>

                            <form
                              action={async () => {
                                "use server";

                                await prisma.order.update({
                                  where: {
                                    id: order.id,
                                  },
                                  data: {
                                    status: "CANCELLED",
                                  },
                                });
                              }}
                            >
                              <button
                                type="submit"
                                className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-500/20 transition"
                              >
                                لغو
                              </button>
                            </form>

                          </div>
                        </div>
                      </td>

                      <td className="p-5 text-gray-400 whitespace-nowrap">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString("fa-IR")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </main>
  );
}