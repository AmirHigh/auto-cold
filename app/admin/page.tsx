import { prisma } from "@/lib/prisma";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import AdminToast from "@/components/AdminToast";
import CarTable from "@/components/CarTable";
import { deleteCar } from "./add-car/actions";

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
    const price = Number(car.price.replace(/[^0-9]/g, ""));

    return sum + (isNaN(price) ? 0 : price);
  }, 0);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">

      <AdminToast success={success} />

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-10 border-b border-slate-800 pb-6">

          <h1 className="text-4xl font-bold text-blue-400">
            پنل مدیریت AUTO COLD
          </h1>

          <LogoutButton />

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">

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

          <div className="bg-slate-900 rounded-2xl border border-yellow-500/20 p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-400">
                  امروز
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

<h2 className="text-3xl font-bold mb-6">
  سفارش‌های ثبت شده
</h2>

<div className="overflow-x-auto rounded-3xl border border-blue-500/20 mb-16">

  <table className="w-full">

    <thead className="bg-slate-900">

      <tr>
        <th className="p-4 text-right">خودرو</th>
        <th className="p-4 text-right">نام مشتری</th>
        <th className="p-4 text-right">شماره</th>
        <th className="p-4 text-right">ایمیل</th>
        <th className="p-4 text-right">تاریخ</th>
      </tr>

    </thead>

    <tbody>

      {orders.map((order) => (

        <tr
          key={order.id}
          className="border-t border-slate-800 hover:bg-slate-900"
        >

          <td className="p-4">
            {order.car.brand} {order.car.model}
          </td>

          <td className="p-4">
            {order.fullName}
          </td>

          <td className="p-4">
            {order.phone}
          </td>

          <td className="p-4">
            {order.email || "-"}
          </td>

          <td className="p-4">
            {order.createdAt.toLocaleDateString()}
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

{/* Cars */}

<div className="flex items-center justify-between mb-8">

  <h2 className="text-3xl font-bold text-blue-400">
    مدیریت خودروها
  </h2>

  <Link
    href="/admin/add-car"
    className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold"
  >
    + افزودن خودرو
  </Link>

</div>

<CarTable
  cars={cars}
  deleteAction={deleteCar}
/>
      </div>
    </main>
  );
}