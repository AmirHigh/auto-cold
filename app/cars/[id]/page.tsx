import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import CarGallery from "@/components/CarGallery";

import {
  Calendar,
  DollarSign,
  Car,
  Gauge,
  Palette,
  Settings,
  Fuel,
  Zap,
  ShieldCheck,
  Sparkles,
  Wrench,
  CircleCheck,
} from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  if (!value) return null;

  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/5 py-4 last:border-0">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-left text-sm font-bold text-white">
        {value}
      </span>
    </div>
  );
}

function Section({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-[#0b1427]">
      <div className="flex items-center gap-4 border-b border-white/10 p-5 sm:p-7">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-400">
          {icon}
        </div>

        <div>
          <h2 className="text-lg font-black text-white sm:text-xl">
            {title}
          </h2>
          <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
        </div>
      </div>

      <div className="p-5 sm:p-7">{children}</div>
    </section>
  );
}

function DetailCard({
  title,
  value,
}: {
  title: string;
  value: string | null;
}) {
  if (!value) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <p className="mb-2 text-xs text-gray-400">{title}</p>
      <p className="whitespace-pre-line text-sm font-bold leading-7 text-white">
        {value}
      </p>
    </div>
  );
}

export default async function CarDetailsPage({ params }: Props) {
  const { id } = await params;
  const carId = Number(id);

  if (!Number.isInteger(carId) || carId <= 0) {
    notFound();
  }

  const car = await prisma.car.findUnique({
    where: { id: carId },
    include: { images: true },
  });

  if (!car) {
    notFound();
  }

  const galleryImages =
    car.images.length > 0
      ? car.images.map((img) => img.image)
      : car.image
        ? [car.image]
        : [];

  const features = car.features
    ? car.features
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  return (
    <main
      className="min-h-screen bg-[#050817] px-4 pb-24 pt-28 text-white sm:px-6 sm:pt-32"
      dir="rtl"
    >
      <div className="mx-auto max-w-7xl space-y-8">

        {/* عنوان خودرو */}

        <div className="text-center">
          <p className="mb-3 text-sm font-bold tracking-[5px] text-blue-400">
            AUTO COLD
          </p>

          <h1 className="text-3xl font-black sm:text-5xl">
            {car.brand} {car.model}
          </h1>

          <p className="mt-3 text-gray-400">
            Luxury Car Gallery
          </p>
        </div>

        {/* گالری تصاویر */}

        <div className="overflow-hidden rounded-3xl border border-blue-400/20 bg-slate-900 p-2 sm:p-4">
          <CarGallery images={galleryImages} />
        </div>

        {/* اطلاعات اولیه */}

        <Section
          title="مشخصات کلی خودرو"
          subtitle="اطلاعات اصلی خودرو"
          icon={<Car size={25} />}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <DetailCard title="برند" value={car.brand} />
            <DetailCard title="مدل" value={car.model} />
            <DetailCard title="سال ساخت" value={String(car.year)} />
            <DetailCard title="رنگ" value={car.color} />
            <DetailCard title="کارکرد" value={car.mileage} />
            <DetailCard title="تعداد تصاویر" value={String(galleryImages.length)} />
          </div>
        </Section>

        {/* مشخصات فنی */}

        <Section
          title="مشخصات فنی"
          subtitle="اطلاعات موتور و سیستم انتقال قدرت"
          icon={<Settings size={25} />}
        >
          <div className="grid gap-x-8 sm:grid-cols-2">
            <InfoItem label="نوع موتور" value={car.engineType} />
            <InfoItem label="حجم موتور" value={car.engineVolume} />
            <InfoItem label="تعداد سیلندر" value={car.cylinders} />
            <InfoItem label="قدرت موتور" value={car.horsepower} />
            <InfoItem label="گیربکس" value={car.transmission} />
            <InfoItem label="نوع سوخت" value={car.fuelType} />
          </div>

          {!car.engineType &&
            !car.engineVolume &&
            !car.cylinders &&
            !car.horsepower &&
            !car.transmission &&
            !car.fuelType && (
              <p className="text-sm text-gray-500">
                مشخصات فنی ثبت نشده است.
              </p>
            )}
        </Section>

        {/* وضعیت خودرو */}

        <Section
          title="وضعیت خودرو"
          subtitle="بررسی وضعیت ظاهری و فنی"
          icon={<ShieldCheck size={25} />}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailCard title="وضعیت بدنه" value={car.bodyCondition} />
            <DetailCard title="وضعیت فنی" value={car.technicalCondition} />
            <DetailCard title="وضعیت رنگ" value={car.paintCondition} />
            <DetailCard title="وضعیت لاستیک‌ها" value={car.tireCondition} />
          </div>

          {!car.bodyCondition &&
            !car.technicalCondition &&
            !car.paintCondition &&
            !car.tireCondition && (
              <p className="text-sm text-gray-500">
                اطلاعات وضعیت خودرو ثبت نشده است.
              </p>
            )}
        </Section>

        {/* امکانات رفاهی */}

        <Section
          title="امکانات رفاهی و آپشن‌ها"
          subtitle="تجهیزات و امکانات خودرو"
          icon={<Sparkles size={25} />}
        >
          {features.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={`${feature}-${index}`}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <CircleCheck
                    size={20}
                    className="shrink-0 text-blue-400"
                  />
                  <span className="text-sm font-semibold">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              امکاناتی برای این خودرو ثبت نشده است.
            </p>
          )}
        </Section>

        {/* توضیحات تکمیلی */}

        {car.description && (
          <Section
            title="توضیحات تکمیلی"
            subtitle="اطلاعات بیشتر درباره خودرو"
            icon={<Wrench size={25} />}
          >
            <p className="whitespace-pre-line text-sm leading-9 text-gray-300 sm:text-base">
              {car.description}
            </p>
          </Section>
        )}

        {/* قیمت و سفارش */}

        <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-950/60 to-slate-900 p-6 sm:p-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <p className="mb-2 text-sm text-gray-400">قیمت خودرو</p>

              <div className="flex items-center gap-2 text-2xl font-black text-blue-400 sm:text-3xl">
                <DollarSign size={25} />
                {car.price}
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href={`/order?carId=${car.id}`}
                className="rounded-xl bg-blue-600 px-10 py-4 text-center font-black text-white transition hover:bg-blue-500"
              >
                ثبت سفارش
              </Link>

              <Link
                href="/cars"
                className="rounded-xl border border-white/15 px-8 py-4 text-center font-bold transition hover:border-blue-400 hover:bg-white/5"
              >
                بازگشت به خودروها
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}