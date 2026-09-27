import { prisma } from "@/lib/prisma";
import FeaturedCars from "@/components/FeaturedCars";

type Props = {
  searchParams: Promise<{
    brand?: string;
    model?: string;
    year?: string;
    sort?: string;
  }>;
};

export default async function CarsPage({
  searchParams,
}: Props) {
  const { brand, model, year, sort } = await searchParams;

  // دریافت همه برندها برای منوی فیلتر
  const brandsData = await prisma.car.findMany({
    select: {
      brand: true,
    },
    distinct: ["brand"],
    orderBy: {
      brand: "asc",
    },
  });

  const brands = brandsData.map((item) => item.brand);

  // مرتب‌سازی خودروها
  let orderBy:
    | { createdAt: "asc" | "desc" }
    | { brand: "asc" | "desc" }
    | { year: "asc" | "desc" }
    | undefined;

  switch (sort) {
    case "brand-asc":
      orderBy = { brand: "asc" };
      break;

    case "brand-desc":
      orderBy = { brand: "desc" };
      break;

    case "year-new":
      orderBy = { year: "desc" };
      break;

    case "year-old":
      orderBy = { year: "asc" };
      break;

    default:
      orderBy = { createdAt: "desc" };
  }

  const cars = await prisma.car.findMany({
    where: {
      AND: [
        brand
          ? {
              brand: {
                equals: brand,
              },
            }
          : {},

        model
          ? {
              model: {
                contains: model,
              },
            }
          : {},

        year
          ? {
              year: Number(year),
            }
          : {},
      ],
    },

    orderBy,

    include: {
      images: true,
    },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* عنوان */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-blue-400 font-bold text-sm sm:text-base mb-2">
            AUTO COLD
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            خودروهای موجود
          </h1>

          <p className="text-gray-400 mt-3">
            خودرو مورد نظر خود را بر اساس برند پیدا کنید
          </p>
        </div>

        {/* فیلترها */}
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 sm:p-5 mb-8">

          <form
            method="GET"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          >

            {/* برند */}
            <select
              name="brand"
              defaultValue={brand || ""}
              className="w-full bg-slate-950 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition"
            >
              <option value="">
                همه برندها
              </option>

              {brands.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* مدل */}
            <input
              type="text"
              name="model"
              defaultValue={model || ""}
              placeholder="جستجوی مدل..."
              className="w-full bg-slate-950 border border-white/10 text-white placeholder:text-gray-500 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition"
            />

            {/* سال */}
            <input
              type="number"
              name="year"
              defaultValue={year || ""}
              placeholder="سال"
              className="w-full bg-slate-950 border border-white/10 text-white placeholder:text-gray-500 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition"
            />

            {/* مرتب سازی */}
            <select
              name="sort"
              defaultValue={sort || ""}
              className="w-full bg-slate-950 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition"
            >
              <option value="">
                جدیدترین خودروها
              </option>

              <option value="brand-asc">
                برند: الف تا ی
              </option>

              <option value="brand-desc">
                برند: ی تا الف
              </option>

              <option value="year-new">
                سال: جدید به قدیم
              </option>

              <option value="year-old">
                سال: قدیم به جدید
              </option>
            </select>

            {/* دکمه */}
            <button
              type="submit"
              className="sm:col-span-2 lg:col-span-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl py-3 transition"
            >
              اعمال فیلتر و مرتب‌سازی
            </button>
          </form>

        </div>

        {/* تعداد نتایج */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-gray-400 text-sm sm:text-base">
            {cars.length} خودرو پیدا شد
          </p>

          {brand && (
            <span className="text-blue-400 font-semibold text-sm">
              برند: {brand}
            </span>
          )}
        </div>

        {/* خودروها */}
        {cars.length > 0 ? (
          <FeaturedCars cars={cars} />
        ) : (
          <div className="min-h-[300px] flex flex-col items-center justify-center bg-slate-900/60 border border-white/10 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-3">
              خودرویی پیدا نشد
            </h2>

            <p className="text-gray-400 text-center px-6">
              برای این فیلتر خودرویی موجود نیست.
            </p>

            <a
              href="/cars"
              className="mt-6 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition"
            >
              نمایش همه خودروها
            </a>
          </div>
        )}
      </div>
    </main>
  );
}