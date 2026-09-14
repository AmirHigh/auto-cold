"use client";

import { useState, useTransition } from "react";
import { updateOrderStatus } from "@/app/admin/actions";

type Props = {
  orderId: number;
  currentStatus: string;
};

const statuses = [
  {
    value: "NEW",
    label: "جدید",
  },
  {
    value: "PENDING",
    label: "در انتظار بررسی",
  },
  {
    value: "CONFIRMED",
    label: "تأیید شده",
  },
  {
    value: "COMPLETED",
    label: "تکمیل شده",
  },
  {
    value: "CANCELLED",
    label: "لغو شده",
  },
];

export default function OrderStatusSelect({
  orderId,
  currentStatus,
}: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();

  function handleChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const newStatus = event.target.value;

    setStatus(newStatus);

    startTransition(async () => {
      try {
        await updateOrderStatus(orderId, newStatus);
      } catch (error) {
        console.error("خطا در تغییر وضعیت سفارش:", error);

        setStatus(currentStatus);
      }
    });
  }

  const getStatusClass = () => {
    switch (status) {
      case "NEW":
        return "border-blue-500/40 bg-blue-500/10 text-blue-400";

      case "PENDING":
        return "border-yellow-500/40 bg-yellow-500/10 text-yellow-400";

      case "CONFIRMED":
        return "border-green-500/40 bg-green-500/10 text-green-400";

      case "COMPLETED":
        return "border-emerald-500/40 bg-emerald-500/10 text-emerald-400";

      case "CANCELLED":
        return "border-red-500/40 bg-red-500/10 text-red-400";

      default:
        return "border-white/10 bg-slate-800 text-gray-300";
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={isPending}
      className={`rounded-xl border px-4 py-2 text-sm font-bold outline-none transition ${getStatusClass()} ${
        isPending ? "cursor-wait opacity-50" : "cursor-pointer"
      }`}
    >
      {statuses.map((item) => (
        <option
          key={item.value}
          value={item.value}
          className="bg-slate-900 text-white"
        >
          {item.label}
        </option>
      ))}
    </select>
  );
}