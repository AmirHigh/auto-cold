"use client";

import { useEffect, useState, useTransition } from "react";
import {
  getFavoriteStatus,
  toggleFavorite,
} from "@/app/favorites/actions";

type Props = {
  carId: number;
};

export default function FavoriteButton({ carId }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    getFavoriteStatus(carId)
      .then((result) => {
        if (!active) return;

        if (result.ok) {
          setIsFavorite(result.isFavorite);
        } else {
          setMessage(result.message ?? "");
        }
      })
      .catch(() => {
        if (active) {
          setMessage("بررسی علاقه‌مندی‌ها ناموفق بود.");
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [carId]);

  function handleToggle() {
    if (isLoading || isPending) return;

    setMessage("");

    startTransition(async () => {
      try {
        const result = await toggleFavorite(carId);

        if (!result.ok) {
          setMessage(result.message ?? "عملیات انجام نشد.");
          return;
        }

        setIsFavorite(result.isFavorite);
        setMessage(result.message ?? "");
      } catch {
        setMessage("خطایی رخ داد. دوباره تلاش کن.");
      }
    });
  }

  return (
    <div className="absolute top-4 left-4 z-20">
      <button
        type="button"
        onClick={handleToggle}
        disabled={isLoading || isPending}
        aria-label={
          isFavorite
            ? "حذف از علاقه‌مندی‌ها"
            : "افزودن به علاقه‌مندی‌ها"
        }
        aria-pressed={isFavorite}
        title={
          isFavorite
            ? "حذف از علاقه‌مندی‌ها"
            : "افزودن به علاقه‌مندی‌ها"
        }
        className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-slate-950/80 text-2xl shadow-lg backdrop-blur transition hover:scale-110 disabled:cursor-wait disabled:opacity-60 ${
          isFavorite ? "text-red-500" : "text-white hover:text-red-400"
        }`}
      >
        {isLoading || isPending ? (
          <span className="text-sm">...</span>
        ) : isFavorite ? (
          "♥"
        ) : (
          "♡"
        )}
      </button>

      {message && (
        <p
          role="status"
          className="absolute left-0 top-14 w-56 rounded-xl border border-white/10 bg-slate-950 p-3 text-right text-xs leading-6 text-gray-200 shadow-xl"
        >
          {message}
        </p>
      )}
    </div>
  );
}