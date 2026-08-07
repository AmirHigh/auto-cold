import { prisma } from "@/lib/prisma";

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
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

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
            <table className="w-full min-w-[900px]">

              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-right">
                  <th className="p-5">مشتری</th>
                  <th className="p-5">خودرو</th>
                  <th className="p-5">تلفن</th>
                  <th className="p-5">ایمیل</th>
                  <th className="p-5">پیام</th>
                  <th className="p-5">تاریخ</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
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

                    <td className="p-5 text-gray-400 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString(
                        "fa-IR"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </main>
  );
}