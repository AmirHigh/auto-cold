import { prisma } from "@/lib/prisma";
import LogoutButton from "@/components/LogoutButton";
import AdminToast from "@/components/AdminToast";
import CarTable from "@/components/CarTable";
import OrderStatusSelect from "@/components/OrderStatusSelect";
import OrderActions from "@/components/OrderActions";

import {
  Car,
  ShoppingCart,
  CalendarDays,
  DollarSign,
} from "lucide-react";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const { success } = await searchParams;

  const orders = await prisma.order.findMany({
    include: {
      car: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const cars = await prisma.car.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalCars = cars.length;
  const totalOrders = orders.length;

  const todayOrders = orders.filter((order) => {
    const today = new Date();

    return (
      order.createdAt.getDate() === today.getDate() &&
      order.createdAt.getMonth() === today.getMonth() &&
      order.createdAt.getFullYear() === today.getFullYear()
    );
  }).length;

  const totalValue = cars.reduce((sum, car) => {
    const price = Number(
      car.price.replace(/[^0-9]/g, "")
    );

    return sum + (isNaN(price) ? 0 : price);
  }, 0);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <AdminToast success={success} />

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10 border-b border-slate-800 pb-6">
          <div>
            <p className="text-blue-400 font-bold mb-2">
              AUTO COLD
            </p>

            <h1 className="text-4xl font-bold text-white">
              پنل مدیریت
            </h1>

            <p className="text-gray-400 mt-2">
              مدیریت خودروها و سفارش‌های مشتریان
            </p>
          </div>

          <LogoutButton />
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">

          {/* Cars */}
          <div className="bg-slate-900 rounded-2xl border border-blue-500/20 p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-400">
                  خودروها
                </p>

                <h2 className="text-4xl font-bold text-blue-400 mt-3">
                  {totalCars}
                </h2>
              </div>

              <Car
                size={42}
                className="text-blue-400"
              />
            </div>
          </div>

          {/* Orders */}
          <div className="bg-slate-900 rounded-2xl border border-green-500/20 p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-400">
                  سفارش‌ها
                </p>

                <h2 className="text-4xl font-bold text-green-400 mt-3">
                  {totalOrders}
                </h2>
              </div>

              <ShoppingCart
                size={42}
                className="text-green-400"
              />
            </div>
          </div>

          {/* Today */}
          <div className="bg-slate-900 rounded-2xl border border-yellow-500/20 p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-400">
                  سفارش‌های امروز
                </p>

                <h2 className="text-4xl font-bold text-yellow-400 mt-3">
                  {todayOrders}
                </h2>
              </div>

              <CalendarDays
                size={42}
                className="text-yellow-400"
              />
            </div>
          </div>

          {/* Value */}
          <div className="bg-slate-900 rounded-2xl border border-purple-500/20 p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-400">
                  ارزش خودروها
                </p>

                <h2 className="text-3xl font-bold text-purple-400 mt-3">
                  ${totalValue.toLocaleString()}
                </h2>
              </div>

              <DollarSign
                size={42}
                className="text-purple-400"
              />
            </div>
          </div>

        </div>

        {/* Orders */}
        <section className="mb-12">

          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              سفارش‌های مشتریان
            </h2>

            <p className="text-gray-400 mt-2">
              مشاهده و مدیریت سفارش‌های ثبت‌شده
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-900">

            <table className="w-full min-w-[1200px]">

              <thead className="bg-slate-950">

                <tr>
                  <th className="p-4 text-right">
                    خودرو
                  </th>

                  <th className="p-4 text-right">
                    نام مشتری
                  </th>

                  <th className="p-4 text-right">
                    شماره
                  </th>

                  <th className="p-4 text-right">
                    ایمیل
                  </th>

                  <th className="p-4 text-right">
                    تاریخ
                  </th>

                  <th className="p-4 text-right">
                    وضعیت
                  </th>

                  <th className="p-4 text-right">
                    عملیات
                  </th>
                </tr>

              </thead>

              <tbody>

                {orders.length === 0 ? (

                  <tr>
                    <td
                      colSpan={7}
                      className="p-10 text-center text-gray-400"
                    >
                      هنوز سفارشی ثبت نشده است.
                    </td>
                  </tr>

                ) : (

                  orders.map((order) => (

                    <tr
                      key={order.id}
                      className="border-t border-slate-800 hover:bg-slate-800/50 transition"
                    >

                      {/* Car */}
                      <td className="p-4">
                        <div>
                          <p className="font-bold">
                            {order.car.brand}{" "}
                            {order.car.model}
                          </p>

                          <p className="text-sm text-gray-500">
                            {order.car.year}
                          </p>
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="p-4">
                        {order.fullName}
                      </td>

                      {/* Phone */}
                      <td className="p-4 text-gray-300">
                        {order.phone}
                      </td>

                      {/* Email */}
                      <td className="p-4 text-gray-300">
                        {order.email || "-"}
                      </td>

                      {/* Date */}
                      <td className="p-4 text-gray-400 whitespace-nowrap">
                        {order.createdAt.toLocaleDateString(
                          "fa-IR"
                        )}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <OrderStatusSelect
                          orderId={order.id}
                          currentStatus={order.status}
                        />
                      </td>

                      {/* Actions */}
                      <td className="p-4">
                        <OrderActions order={order} />
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </section>

        {/* Cars */}
        <section>

          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              مدیریت خودروها
            </h2>

            <p className="text-gray-400 mt-2">
              جستجو، ویرایش و حذف خودروهای موجود
            </p>
          </div>

          <CarTable cars={cars} />

        </section>

      </div>
    </main>
  );
}