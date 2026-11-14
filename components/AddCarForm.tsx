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
  color?: string | null;
  mileage?: string | number | null;
  engineType?: string | null;
  engineVolume?: string | null;
  cylinders?: string | number | null;
  horsepower?: string | number | null;
  transmission?: string | null;
  fuelType?: string | null;
  bodyCondition?: string | null;
  technicalCondition?: string | null;
  paintCondition?: string | null;
  tireCondition?: string | null;
  features?: string | null;
  images?: { url: string }[];
};

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  car?: CarType;
};

type FieldProps = {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string | number | null;
  placeholder?: string;
};

function Field({
  name,
  label,
  type = "text",
  defaultValue,
  placeholder,
}: FieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-blue-500"
      />
    </div>
  );
}

function SelectField({
  name,
  label,
  defaultValue,
  options,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  options: string[];
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>

      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
      >
        <option value="">انتخاب کنید</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function AddCarForm({ action, car }: Props) {
  const [images, setImages] = useState<string[]>(
    car?.images?.map((img) => img.url) ??
      (car?.image ? [car.image] : [])
  );

  return (
    <form
      action={action}
      className="space-y-8"
      dir="rtl"
      onSubmit={(e) => {
        const formData = new FormData(e.currentTarget);

        console.log("FORM DATA CHECK:", {
          brand: formData.get("brand"),
          model: formData.get("model"),
          year: formData.get("year"),
          price: formData.get("price"),
          fieldNames: Array.from(formData.keys()),
        });
      }}
    >
      {/* اطلاعات اصلی */}

      <section className="space-y-5">
        <h2 className="text-xl font-bold text-blue-400">
          اطلاعات اصلی خودرو
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field
            name="brand"
            label="برند خودرو"
            defaultValue={car?.brand}
            placeholder="مثلاً BMW"
          />

          <Field
            name="model"
            label="مدل خودرو"
            defaultValue={car?.model}
            placeholder="مثلاً M4 Competition"
          />

          <Field
            name="year"
            label="سال ساخت"
            type="number"
            defaultValue={car?.year}
            placeholder="2024"
          />

          <Field
            name="price"
            label="قیمت"
            defaultValue={car?.price}
            placeholder="مثلاً 82000"
          />

          <Field
            name="color"
            label="رنگ خودرو"
            defaultValue={car?.color}
            placeholder="مشکی"
          />

          <Field
            name="mileage"
            label="کارکرد (کیلومتر)"
            type="number"
            defaultValue={car?.mileage}
            placeholder="مثلاً 15000"
          />
        </div>
      </section>

      {/* تصاویر */}

      <section className="space-y-5">
        <h2 className="text-xl font-bold text-blue-400">
          تصاویر خودرو
        </h2>

        <ImageUploader
          onUploaded={(urls) => {
            setImages((prev) => [...prev, ...urls]);
          }}
        />

        <input
          type="hidden"
          name="image"
          value={images[0] ?? ""}
          readOnly
        />

        <input
          type="hidden"
          name="images"
          value={JSON.stringify(images)}
          readOnly
        />

        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {images.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="relative overflow-hidden rounded-xl border border-slate-700"
              >
                <img
                  src={url}
                  alt={`Car ${index + 1}`}
                  className="h-36 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() =>
                    setImages((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                  className="absolute left-2 top-2 rounded-lg bg-red-600 px-3 py-1 text-xs text-white"
                >
                  حذف
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* مشخصات فنی */}

      <section className="space-y-5">
        <h2 className="text-xl font-bold text-blue-400">
          مشخصات فنی
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field
            name="engineType"
            label="نوع موتور"
            defaultValue={car?.engineType}
            placeholder="مثلاً V8"
          />

          <Field
            name="engineVolume"
            label="حجم موتور"
            defaultValue={car?.engineVolume}
            placeholder="مثلاً 4.0 لیتر"
          />

          <Field
            name="cylinders"
            label="تعداد سیلندر"
            type="number"
            defaultValue={car?.cylinders}
          />

          <Field
            name="horsepower"
            label="قدرت موتور (اسب بخار)"
            type="number"
            defaultValue={car?.horsepower}
          />

          <SelectField
            name="transmission"
            label="گیربکس"
            defaultValue={car?.transmission}
            options={["اتوماتیک", "دستی", "نیمه اتوماتیک"]}
          />

          <SelectField
            name="fuelType"
            label="نوع سوخت"
            defaultValue={car?.fuelType}
            options={["بنزین", "دیزل", "هیبرید", "برقی"]}
          />
        </div>
      </section>

      {/* وضعیت خودرو */}

      <section className="space-y-5">
        <h2 className="text-xl font-bold text-blue-400">
          وضعیت خودرو
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <SelectField
            name="bodyCondition"
            label="وضعیت بدنه"
            defaultValue={car?.bodyCondition}
            options={["سالم", "تصادفی", "دارای خط و خش"]}
          />

          <SelectField
            name="technicalCondition"
            label="وضعیت فنی"
            defaultValue={car?.technicalCondition}
            options={["سالم", "نیازمند تعمیر"]}
          />

          <SelectField
            name="paintCondition"
            label="وضعیت رنگ"
            defaultValue={car?.paintCondition}
            options={["بدون رنگ", "یک لکه رنگ", "چند لکه رنگ", "تمام رنگ"]}
          />

          <SelectField
            name="tireCondition"
            label="وضعیت لاستیک"
            defaultValue={car?.tireCondition}
            options={["عالی", "خوب", "متوسط", "نیازمند تعویض"]}
          />
        </div>
      </section>

      {/* امکانات */}

      <section className="space-y-5">
        <h2 className="text-xl font-bold text-blue-400">
          امکانات و توضیحات
        </h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            امکانات خودرو
          </label>

          <textarea
            name="features"
            defaultValue={car?.features ?? ""}
            rows={3}
            placeholder="مثلاً سانروف، دوربین 360، گرمکن صندلی..."
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            توضیحات خودرو
          </label>

          <textarea
            name="description"
            defaultValue={car?.description ?? ""}
            rows={5}
            placeholder="توضیحات کامل خودرو را وارد کنید..."
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>
      </section>

      {/* ثبت */}

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-500"
      >
        {car ? "ذخیره تغییرات خودرو" : "ثبت خودرو"}
      </button>
    </form>
  );
}