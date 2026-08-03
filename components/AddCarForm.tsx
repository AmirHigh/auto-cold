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
        className="w-full p-4 rounded-xl bg-slate-800 outline-none"
      />

      <input
        name="model"
        type="text"
        defaultValue={car?.model ?? ""}
        placeholder="مدل خودرو"
        required
        className="w-full p-4 rounded-xl bg-slate-800 outline-none"
      />

      <input
        name="year"
        type="number"
        defaultValue={car?.year ?? ""}
        placeholder="سال ساخت"
        required
        className="w-full p-4 rounded-xl bg-slate-800 outline-none"
      />

      <input
        name="price"
        type="text"
        defaultValue={car?.price ?? ""}
        placeholder="قیمت"
        required
        className="w-full p-4 rounded-xl bg-slate-800 outline-none"
      />

      <ImageUploader
        onUploaded={(urls) =>
          setImages((prev) => [...prev, ...urls])
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

        <div className="grid grid-cols-3 gap-4">

          {images.map((img, index) => (

            <img
              key={index}
              src={img}
              alt=""
              className="rounded-xl h-32 w-full object-cover border border-slate-700"
            />

          ))}

        </div>

      )}

      <textarea
        name="description"
        rows={6}
        defaultValue={car?.description ?? ""}
        placeholder="توضیحات خودرو"
        className="w-full p-4 rounded-xl bg-slate-800 outline-none"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold text-lg"
      >
        {car
          ? "ذخیره تغییرات"
          : "افزودن خودرو"}
      </button>

    </form>
  );
}