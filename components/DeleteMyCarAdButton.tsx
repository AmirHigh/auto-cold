"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteMyCarAd } from "@/app/sell/actions";

type Props = {
  adId: number;
};

export default function DeleteMyCarAdButton({ adId }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "آیا مطمئنی می‌خواهی آگهی خودت را برای همیشه حذف کنی؟"
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      const result = await deleteMyCarAd(adId);

      if (!result.success) {
        window.alert(result.message || "حذف آگهی انجام نشد.");
        return;
      }

      window.alert("آگهی با موفقیت حذف شد.");
      router.push("/sell");
      router.refresh();
    } catch (error) {
      console.error("DELETE MY AD ERROR:", error);
      window.alert("هنگام حذف آگهی خطایی رخ داد.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="mt-3 block w-full rounded-xl border border-red-500/30 bg-red-500/10 py-4 text-center font-bold text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "در حال حذف آگهی..." : "🗑️ حذف آگهی من"}
    </button>
  );
}