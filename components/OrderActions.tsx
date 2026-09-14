"use client";

import { useState, useTransition } from "react";
import { Eye, Trash2, X } from "lucide-react";
import { deleteOrder } from "@/app/admin/actions";

type Order = {
  id: number;
  fullName: string;
  phone: string;
  email: string | null;
  message: string | null;
  status: string;
  createdAt: Date;
  car: {
    brand: string;
    model: string;
    year: number;
    price: string;
  };
};

type Props = {
  order: Order;
};

export default function OrderActions({ order }: Props) {
  const [isPending, startTransition] = useTransition();
  const [showDetails, setShowDetails] = useState(false);

  function handleDelete() {
    const confirmed = window.confirm(
      `آیا مطمئنی می‌خواهی سفارش «${order.fullName}» حذف شود؟`
    );

    if (!confirmed) return;

    startTransition(async () => {
      await deleteOrder(order.id);
    });
  }

  return (
    <>
      <div className="flex items-center gap-2">

        {/* Details */}
        <button
          type="button"
          onClick={() => setShowDetails(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600/20 px-3 py-2 text-blue-400 hover:bg-blue-600 hover:text-white transition"
        >
          <Eye size={17} />
          جزئیات
        </button>

        {/* Delete */}
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="flex items-center gap-2 rounded-xl bg-red-600/20 px-3 py-2 text-red-400 hover:bg-red-600 hover:text-white transition disabled:opacity-50"
        >
          <Trash2 size={17} />

          {isPending ? "در حال حذف..." : "حذف"}
        </button>

      </div>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6">

          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-white/10 p-8 shadow-2xl">

            {/* Close */}
            <button
              type="button"
              onClick={() => setShowDetails(false)}
              className="absolute left-5 top-5 rounded-xl p-2 text-gray-400 hover:bg-white/10 hover:text-white transition"
            >
              <X size={22} />
            </button>

            <h2 className="text-3xl font-bold mb-8 text-blue-400">
              جزئیات سفارش
            </h2>

            <div className="space-y-5">

              {/* Customer */}
              <div className="rounded-2xl bg-slate-800 p-5">
                <p className="text-gray-400 text-sm mb-2">
                  مشتری
                </p>

                <p className="text-xl font-bold">
                  {order.fullName}
                </p>
              </div>

              {/* Phone */}
              <div className="rounded-2xl bg-slate-800 p-5">
                <p className="text-gray-400 text-sm mb-2">
                  شماره تماس
                </p>

                <p className="text-lg">
                  {order.phone}
                </p>
              </div>

              {/* Email */}
              <div className="rounded-2xl bg-slate-800 p-5">
                <p className="text-gray-400 text-sm mb-2">
                  ایمیل
                </p>

                <p className="text-lg">
                  {order.email || "ثبت نشده"}
                </p>
              </div>

              {/* Car */}
              <div className="rounded-2xl bg-slate-800 p-5">
                <p className="text-gray-400 text-sm mb-2">
                  خودرو
                </p>

                <p className="text-xl font-bold">
                  {order.car.brand} {order.car.model}
                </p>

                <p className="text-gray-400 mt-1">
                  مدل {order.car.year}
                </p>

                <p className="text-blue-400 font-bold mt-3">
                  {order.car.price}
                </p>
              </div>

              {/* Message */}
              <div className="rounded-2xl bg-slate-800 p-5">
                <p className="text-gray-400 text-sm mb-2">
                  پیام مشتری
                </p>

                <p className="leading-8 text-gray-200">
                  {order.message || "پیامی ثبت نشده است."}
                </p>
              </div>

              {/* Status + Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="rounded-2xl bg-slate-800 p-5">
                  <p className="text-gray-400 text-sm mb-2">
                    وضعیت
                  </p>

                  <p className="font-bold">
                    {order.status}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-800 p-5">
                  <p className="text-gray-400 text-sm mb-2">
                    تاریخ ثبت
                  </p>

                  <p className="font-bold">
                    {order.createdAt.toLocaleDateString("fa-IR")}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}
    </>
  );
}