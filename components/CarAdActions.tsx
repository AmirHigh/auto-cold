"use client";

import { useTransition } from "react";
import {
  approveCarAd,
  rejectCarAd,
} from "@/app/admin/actions";

type Props = {
  adId: number;
  status: string;
};

export default function CarAdActions({
  adId,
  status,
}: Props) {
  const [isPending, startTransition] =
    useTransition();

  if (status !== "PENDING") {
    return (
      <span className="text-gray-500 text-sm">
        بررسی شده
      </span>
    );
  }

  return (
    <div className="flex gap-2">

      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            await approveCarAd(adId);
          });
        }}
        className="rounded-lg bg-green-600 hover:bg-green-500 disabled:opacity-50 px-4 py-2 font-bold text-white transition"
      >
        {isPending ? "..." : "تأیید"}
      </button>

      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            await rejectCarAd(adId);
          });
        }}
        className="rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-50 px-4 py-2 font-bold text-white transition"
      >
        {isPending ? "..." : "رد"}
      </button>

    </div>
  );
}