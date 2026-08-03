"use client";

import { useState } from "react";
import { createOrder } from "@/app/actions/order";

type Props = {
  car: string;
  carId: number;
};

export default function OrderForm({ car, carId }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    await createOrder({
      fullName: formData.get("fullName") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      carId,
    });

    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-green-600 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold">
          ✅ سفارش شما ثبت شد
        </h2>

        <p className="mt-4">
          کارشناسان AUTO COLD در سریع‌ترین زمان با شما تماس خواهند گرفت.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <input
        value={car}
        readOnly
        className="w-full p-4 rounded-xl bg-slate-800"
      />

      <input
        name="fullName"
        required
        placeholder="نام و نام خانوادگی"
        className="w-full p-4 rounded-xl bg-slate-800"
      />

      <input
        name="phone"
        required
        type="tel"
        placeholder="شماره تماس"
        className="w-full p-4 rounded-xl bg-slate-800"
      />

      <input
        name="email"
        type="email"
        placeholder="ایمیل"
        className="w-full p-4 rounded-xl bg-slate-800"
      />

      <textarea
        name="message"
        rows={5}
        placeholder="توضیحات"
        className="w-full p-4 rounded-xl bg-slate-800"
      />

      <button
        disabled={loading}
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold"
      >
        {loading ? "در حال ثبت..." : "ثبت سفارش"}
      </button>

    </form>
  );
}