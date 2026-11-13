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

  mileage?: string | null;
  color?: string | null;
  engineType?: string | null;
  engineVolume?: string | null;
  cylinders?: string | null;
  horsepower?: string | null;
  transmission?: string | null;
  fuelType?: string | null;

  bodyCondition?: string | null;
  technicalCondition?: string | null;
  paintCondition?: string | null;
  tireCondition?: string | null;
  features?: string | null;
};

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  car?: CarType;
};

const inputClass =
  "w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-white outline-none transition focus:border-blue-500";

const sectionClass =
  "space-y-5 rounded-2xl border border-white/10 bg-slate-900 p-5 sm:p-7";

function SectionTitle({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="border-b border-white/10 pb-4">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold">
          {number}
        </span>
        <h2 className="text-xl font-black text-white">{title}</h2>
      </div>
      <p className="mt-2 text-sm text-gray-400">{subtitle}</p>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-gray-300">
        {label}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder ?? label}
        className={inputClass}
      />
    </label>
  );
}

function TextAreaField({
  label,
  name,
  defaultValue,
  placeholder,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-gray-300">
        {label}
      </span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder ?? label}
        className={`${inputClass} resize-y`}
      />
    </label>
  );
}

export default function AddCarForm({ action, car }: Props) {
  const [images, setImages] = useState<string[]>(
    car?.image ? [car.image] : []
  );

  const removeImage = (index: number) => {
    setImages((previous) =>
      previous.filter((_, i) => i !== index)
    );
  };

  return (
    <form action={action} className="space-y-6" dir="rtl">
      {car && (
        <input type="hidden" name="id" value={car.id} />
      )}

      {/* اطلاعات اولیه */}

      <section className={sectionClass}>
        <SectionTitle
          number="۱"
          title="اطلاعات اولیه خودرو"
          subtitle="اطلاعات اصلی برای معرفی خودرو"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            name="brand"
            label="برند خودرو"
            defaultValue={car?.brand}
            placeholder="مثلاً Mercedes-Benz"
          />

          <Field
            name="model"
            label="مدل خودرو"
            defaultValue={car?.model}
            placeholder="مثلاً G63 AMG"
          />

          <Field
            name="year"
            label="سال ساخت"
            type="number"
            defaultValue={car?.year?.toString()}
          />

          <Field
            name="price"
            label="قیمت"
            defaultValue={car?.price}
            placeholder="مثلاً 195,000 USD"
          />

          <Field
            name="color"
            label="رنگ خودرو"
            defaultValue={car?.color}
            placeholder="مثلاً مشکی متالیک"
          />

          <Field
            name="mileage"
            label="کارکرد"
            defaultValue={car?.mileage}
            placeholder="مثلاً 25,000 کیلومتر"
          />
        </div>
      </section>

      {/* تصاویر */}

      <section className={sectionClass}>
        <SectionTitle
          number="۲"
          title="گالری تصاویر"
          subtitle="حداکثر ۱۰ تصویر برای معرفی خودرو"
        />

        <ImageUploader
          currentCount={images.length}
          onUploaded={(urls) =>
            setImages((previous) =>
              [...previous, ...urls].slice(0, 10)
            )
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
              <div key={`${img}-${index}`} className="relative">
                <img
                  src={img}
                  alt={`تصویر خودرو ${index + 1}`}
                  className="h-32 w-full rounded-xl border border-slate-700 object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute right-2 top-2 rounded-lg bg-red-600 px-3 py-1 text-sm font-bold text-white"
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
      </section>

      {/* مشخصات فنی */}

      <section className={sectionClass}>
        <SectionTitle
          number="۳"
          title="مشخصات فنی"
          subtitle="اطلاعات موتور و عملکرد خودرو"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            name="engineType"
            label="نوع موتور"
            defaultValue={car?.engineType}
            placeholder="مثلاً V6"
          />

          <Field
            name="engineVolume"
            label="حجم موتور"
            defaultValue={car?.engineVolume}
            placeholder="مثلاً 3.8 لیتر"
          />

          <Field
            name="cylinders"
            label="تعداد سیلندر"
            defaultValue={car?.cylinders}
            placeholder="مثلاً ۶ سیلندر"
          />

          <Field
            name="horsepower"
            label="قدرت موتور"
            defaultValue={car?.horsepower}
            placeholder="مثلاً 315 اسب بخار"
          />

          <Field
            name="transmission"
            label="گیربکس"
            defaultValue={car?.transmission}
            placeholder="مثلاً اتوماتیک"
          />

          <Field
            name="fuelType"
            label="نوع سوخت"
            defaultValue={car?.fuelType}
            placeholder="مثلاً بنزین"
          />
        </div>
      </section>

      {/* وضعیت خودرو */}

      <section className={sectionClass}>
        <SectionTitle
          number="۴"
          title="وضعیت خودرو"
          subtitle="شرح وضعیت ظاهری و فنی خودرو"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <TextAreaField
            name="bodyCondition"
            label="وضعیت بدنه"
            defaultValue={car?.bodyCondition}
            placeholder="مثلاً بدون تصادف"
            rows={3}
          />

          <TextAreaField
            name="technicalCondition"
            label="وضعیت فنی"
            defaultValue={car?.technicalCondition}
            placeholder="مثلاً موتور و گیربکس سالم"
            rows={3}
          />

          <TextAreaField
            name="paintCondition"
            label="وضعیت رنگ"
            defaultValue={car?.paintCondition}
            placeholder="مثلاً بدون رنگ"
            rows={3}
          />

          <TextAreaField
            name="tireCondition"
            label="وضعیت لاستیک‌ها"
            defaultValue={car?.tireCondition}
            placeholder="مثلاً ۸۰ درصد"
            rows={3}
          />
        </div>
      </section>

      {/* امکانات رفاهی */}

      <section className={sectionClass}>
        <SectionTitle
          number="۵"
          title="امکانات رفاهی و آپشن‌ها"
          subtitle="هر امکان را در یک خط وارد کن"
        />

        <TextAreaField
          name="features"
          label="امکانات خودرو"
          defaultValue={car?.features}
          placeholder={
            "سانروف\nصندلی برقی\nگرم‌کن صندلی\nدوربین عقب\nسیستم صوتی حرفه‌ای"
          }
          rows={7}
        />
      </section>

      {/* توضیحات تکمیلی */}

      <section className={sectionClass}>
        <SectionTitle
          number="۶"
          title="توضیحات تکمیلی"
          subtitle="اطلاعاتی که در دسته‌بندی‌های بالا قرار نمی‌گیرند"
        />

        <TextAreaField
          name="description"
          label="توضیحات بیشتر"
          defaultValue={car?.description}
          placeholder="توضیحات تکمیلی درباره خودرو..."
          rows={5}
        />
      </section>

      <button
        type="submit"
        disabled={images.length === 0}
        className="w-full rounded-xl bg-blue-600 py-4 text-lg font-black text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {car ? "ذخیره تغییرات" : "افزودن خودرو"}
      </button>
    </form>
  );
}