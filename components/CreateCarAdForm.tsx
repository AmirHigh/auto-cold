
"use client";

import { useRef, useState } from "react";
import { createCarAd } from "@/app/sell/actions";

type Props = {
  user: {
    name: string;
    phone: string;
    city: string;
  };
};

const MAX_IMAGES = 5;
const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

export default function CreateCarAdForm({ user }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [selectedCount, setSelectedCount] = useState(0);

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setError("");
    setMessage("");

    const files = Array.from(event.target.files ?? []);

    if (files.length > MAX_IMAGES) {
      event.target.value = "";
      setSelectedCount(0);
      setError("حداکثر می‌توانید ۵ تصویر انتخاب کنید.");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        event.target.value = "";
        setSelectedCount(0);
        setError("فرمت تصاویر باید JPG، PNG یا WebP باشد.");
        return;
      }

      if (file.size > MAX_IMAGE_SIZE) {
        event.target.value = "";
        setSelectedCount(0);
        setError("حجم هر تصویر نباید بیشتر از ۸ مگابایت باشد.");
        return;
      }
    }

    setSelectedCount(files.length);
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const result = await createCarAd(formData);

      if (!result.success) {
        setError(
          result.message || "ثبت آگهی ناموفق بود."
        );
        return;
      }

      setMessage(
        result.message ||
          "آگهی با موفقیت ثبت شد و پس از تأیید مدیر منتشر می‌شود."
      );

      form.reset();
      setSelectedCount(0);
    } catch (err) {
      console.error("CREATE CAR AD FORM ERROR:", err);

      setError(
        "ارتباط با سرور هنگام ثبت آگهی با مشکل مواجه شد. لطفاً ترمینال را بررسی کنید."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="space-y-6 rounded-3xl border border-blue-500/20 bg-slate-900 p-6 sm:p-8"
    >
      {message && (
        <div
          role="status"
          className="rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-green-400"
        >
          {message}
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400"
        >
          {error}
        </div>
      )}

      <div>
        <label className="mb-2 block font-semibold">
          عنوان آگهی
        </label>
        <input
          name="title"
          required
          placeholder="مثلاً BMW M4 Competition 2024"
          className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block font-semibold">
            برند
          </label>
          <input
            name="brand"
            required
            placeholder="BMW"
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            مدل
          </label>
          <input
            name="model"
            required
            placeholder="M4 Competition"
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block font-semibold">
            سال
          </label>
          <input
            name="year"
            type="number"
            min="1900"
            max="2100"
            required
            placeholder="2024"
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            قیمت
          </label>
          <input
            name="price"
            required
            placeholder="$82,000"
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          شهر
        </label>
        <input
          name="city"
          defaultValue={user.city}
          required
          placeholder="تهران"
          className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          شماره تماس
        </label>
        <input
          name="phone"
          defaultValue={user.phone}
          required
          type="tel"
          placeholder="09123456789"
          className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          توضیحات
        </label>
        <textarea
          name="description"
          rows={6}
          placeholder="توضیحات خودرو، وضعیت فنی، آپشن‌ها و..."
          className="w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          تصاویر خودرو
        </label>

        <input
          name="images"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleImageChange}
          className="w-full rounded-xl border border-white/10 bg-slate-950 p-3 text-gray-300"
        />

        <p className="mt-2 text-xs text-gray-400">
          حداکثر ۵ تصویر؛ فرمت JPG، PNG یا WebP و حجم هر تصویر حداکثر ۸ مگابایت.
        </p>

        {selectedCount > 0 && (
          <p className="mt-2 text-sm text-blue-400">
            {selectedCount} تصویر انتخاب شده است.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "در حال ثبت آگهی..." : "ثبت آگهی"}
      </button>
    </form>
  );
}
