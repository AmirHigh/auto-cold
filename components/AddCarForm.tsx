"use client";

import { useState } from "react";
import ImageUploader from "./ImageUploader";

type CarType = {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: string;
  image: string;
  description: string | null;
};

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  car?: CarType;
};

export default function AddCarForm({
  action,
  car,
}: Props) {
  const [images, setImages] = useState<string[]>(
    car?.image ? [car.image] : []
  );

  const removeImage = (index: number) => {
    setImages((previous) =>
      previous.filter((_, i) => i !== index)
    );
  };

  return (
    <form action={action} className="space-y-6">
      {car && (
        <input
          type="hidden"
          name="id"
          value={car.id}
        />
      )}

      <input
        name="brand"
        type="text"
        defaultValue={car?.brand ?? ""}
        placeholder="برند خودرو"
        required
        className="w-full rounded-xl bg-slate-800 p-4 outline-none"
      />

      <input
        name="model"
        type="text"
        defaultValue={car?.model ?? ""}
        placeholder="مدل خودرو"
        required
        className="w-full rounded-xl bg-slate-800 p-4 outline-none"
      />

      <input
        name="year"
        type="number"
        defaultValue={car?.year ?? ""}
        placeholder="سال ساخت"
        required
        className="w-full rounded-xl bg-slate-800 p-4 outline-none"
      />

      <input
        name="price"
        type="text"
        defaultValue={car?.price ?? ""}
        placeholder="قیمت"
        required
        className="w-full rounded-xl bg-slate-800 p-4 outline-none"
      />

      <ImageUploader
        currentCount={images.length}
        onUploaded={(urls) =>
          setImages((previous) => [
            ...previous,
            ...urls,
          ].slice(0, 10))
        }
      />

      <input
        type="hidden"
        name="image"
        value={images[0] ?? ""}
      />

      <input
        type="hidden"
        name="images"
        value={JSON.stringify(images)}
      />

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.map((img, index) => (
            <div
              key={`${img}-${index}`}
              className="relative"
            >
              <img
                src={img}
                alt={`تصویر خودرو ${index + 1}`}
                className="h-32 w-full rounded-xl border border-slate-700 object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute right-2 top-2 rounded-lg bg-red-600 px-3 py-1 text-sm font-bold text-white hover:bg-red-500"
              >
                حذف
              </button>

              {index === 0 && (
                <span className="absolute bottom-2 left-2 rounded-lg bg-blue-600 px-2 py-1 text-xs text-white">
                  تصویر اصلی
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <textarea
        name="description"
        rows={6}
        defaultValue={car?.description ?? ""}
        placeholder="توضیحات خودرو"
        className="w-full rounded-xl bg-slate-800 p-4 outline-none"
      />

      <button
        type="submit"
        disabled={images.length === 0}
        className="w-full rounded-xl bg-blue-600 py-4 text-lg font-bold hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {car ? "ذخیره تغییرات" : "افزودن خودرو"}
      </button>
    </form>
  );
}