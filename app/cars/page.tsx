import { prisma } from "@/lib/prisma";
import FeaturedCars from "@/components/FeaturedCars";

type Props = {
  searchParams: Promise<{
    brand?: string;
    model?: string;
    year?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  }>;
};

type BrandItem = {
  brand: string;
};

type CarListItem = {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: string;
  image: string | null;
  description: string | null;
  status: string;
  images: {
    image: string;
  }[];
};

export default async function CarsPage({
  searchParams,
}: Props) {
  const {
    brand,
    model,
    year,
    minPrice,
    maxPrice,
    sort,
  } = await searchParams;

  // دریافت برندهای موجود
  const brandsData: BrandItem[] = await prisma.car.findMany({
    select: {
      brand: true,
    },
    distinct: ["brand"],
    orderBy: {
      brand: "asc",
    },
  });

  const brands = brandsData.map(
    (item: BrandItem) => item.brand
  );

  // اعتبارسنجی سال ساخت
  const parsedYear =
    year && /^\d{4}$/.test(year)
      ? Number(year)
      : undefined;

  // اعتبارسنجی قیمت‌ها
  const parsedMinPrice =
    minPrice && /^\d+$/.test(minPrice)
      ? Number(minPrice)
      : undefined;

  const parsedMaxPrice =
    maxPrice && /^\d+$/.test(maxPrice)
      ? Number(maxPrice)
      : undefined;

  // مرتب‌سازی
  let orderBy:
    | { createdAt: "asc" | "desc" }
    | { brand: "asc" | "desc" }
    | { year: "asc" | "desc" }
    | { model: "asc" | "desc" };

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

    case "model-asc":
      orderBy = { model: "asc" };
      break;

    default:
      orderBy = { createdAt: "desc" };
  }

  // جست‌وجو بر اساس برند، مدل و سال
  const databaseCars: CarListItem[] =
    await prisma.car.findMany({
      where: {
        AND: [
          brand
            ? {
                brand: {
                  equals: brand,
                  mode: "insensitive",
                },
              }
            : {},

          model?.trim()
            ? {
                OR: [
                  {
                    model: {
                      contains: model.trim(),
                      mode: "insensitive",
                    },
                  },
                  {
                    brand: {
                      contains: model.trim(),
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {},

          parsedYear
            ? {
                year: parsedYear,
              }
            : {},
        ],
      },

      orderBy,

      include: {
        images: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

  // فیلتر قیمت
  const filteredCars = databaseCars.filter(
    (car: CarListItem) => {
      const normalizedPrice = car.price.replace(
        /[,\s$€£]/g,
        ""
      );

      const numericPrice = Number(normalizedPrice);

      if (
        !Number.isFinite(numericPrice) ||
        normalizedPrice === ""
      ) {
        return (
          parsedMinPrice === undefined &&
          parsedMaxPrice === undefined
        );
      }

      if (
        parsedMinPrice !== undefined &&
        numericPrice < parsedMinPrice
      ) {
        return false;
      }

      if (
        parsedMaxPrice !== undefined &&
        numericPrice > parsedMaxPrice
      ) {
        return false;
      }

      return true;
    }
  );

  // تبدیل خروجی به ساختار مورد انتظار FeaturedCars
  const cars = filteredCars.map(
    (car: CarListItem) => ({
      id: car.id,
      brand: car.brand,
      model: car.model,
      year: car.year,
      price: car.price,
      image: car.images[0]?.image ?? car.image ?? null,
      description: car.description,
      status: car.status as
        | "AVAILABLE"
        | "RESERVED"
        | "SOLD",
    })
  );

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-950 text-white pt-28 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* عنوان صفحه */}
        <div className="text-center mb-10">
          <p className="text-blue-400 font-bold text-sm mb-3">
            AUTO COLD
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black">
            خودروهای موجود
          </h1>

          <p className="text-gray-400 mt-4">
            خودروی موردنظرت را با فیلترهای پیشرفته پیدا کن
          </p>
        </div>

        {/* پنل فیلترها */}
        <section className="bg-slate-900/80 border border-blue-500/20 rounded-3xl p-5 sm:p-7 mb-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-xl">
              ⚙️
            </div>

            <div>
              <h2 className="text-xl font-bold">
                جست‌وجو و فیلتر خودرو
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                مشخصات موردنظرت را انتخاب کن
              </p>
            </div>
          </div>

          <form
            method="GET"
            action="/cars"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {/* برند */}
            <div>
              <label
                htmlFor="brand"
                className="block text-sm text-gray-400 mb-2"
              >
                برند خودرو
              </label>

              <select
                id="brand"
                name="brand"
                defaultValue={brand || ""}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition"
              >
                <option value="">همه برندها</option>

                {brands.map((item: string) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* مدل یا برند */}
            <div>
              <label
                htmlFor="model"
                className="block text-sm text-gray-400 mb-2"
              >
                نام خودرو یا مدل
              </label>

              <input
                id="model"
                type="search"
                name="model"
                defaultValue={model || ""}
                placeholder="مثلاً BMW M4"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 placeholder:text-gray-600 outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* سال */}
            <div>
              <label
                htmlFor="year"
                className="block text-sm text-gray-400 mb-2"
              >
                سال ساخت
              </label>

              <input
                id="year"
                type="number"
                name="year"
                min="1900"
                max="2100"
                defaultValue={year || ""}
                placeholder="مثلاً 2024"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 placeholder:text-gray-600 outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* حداقل قیمت */}
            <div>
              <label
                htmlFor="minPrice"
                className="block text-sm text-gray-400 mb-2"
              >
                حداقل قیمت ($)
              </label>

              <input
                id="minPrice"
                type="number"
                name="minPrice"
                min="0"
                step="1"
                defaultValue={minPrice || ""}
                placeholder="مثلاً 50000"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 placeholder:text-gray-600 outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* حداکثر قیمت */}
            <div>
              <label
                htmlFor="maxPrice"
                className="block text-sm text-gray-400 mb-2"
              >
                حداکثر قیمت ($)
              </label>

              <input
                id="maxPrice"
                type="number"
                name="maxPrice"
                min="0"
                step="1"
                defaultValue={maxPrice || ""}
                placeholder="مثلاً 200000"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 placeholder:text-gray-600 outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* مرتب‌سازی */}
            <div>
              <label
                htmlFor="sort"
                className="block text-sm text-gray-400 mb-2"
              >
                مرتب‌سازی
              </label>

              <select
                id="sort"
                name="sort"
                defaultValue={sort || ""}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition"
              >
                <option value="">جدیدترین خودروها</option>
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
                <option value="model-asc">
                  مدل: الف تا ی
                </option>
              </select>
            </div>

            {/* دکمه‌ها */}
            <div className="sm:col-span-2 lg:col-span-3 flex flex-col sm:flex-row gap-3 mt-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl py-4 transition shadow-lg shadow-blue-600/20"
              >
                🔎 جست‌وجو و اعمال فیلتر
              </button>

              <a
                href="/cars"
                className="flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-7 py-4 font-semibold transition"
              >
                پاک کردن فیلترها
              </a>
            </div>
          </form>
        </section>

        {/* تعداد نتایج */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <p className="text-gray-400">
            تعداد نتایج:{" "}
            <span className="text-blue-400 font-bold">
              {cars.length}
            </span>{" "}
            خودرو
          </p>

          {brand && (
            <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg px-3 py-2 text-sm">
              برند: {brand}
            </span>
          )}
        </div>

        {/* کارت خودروها */}
        {cars.length > 0 ? (
          <FeaturedCars cars={cars} />
        ) : (
          <div className="min-h-[300px] flex flex-col items-center justify-center bg-slate-900/60 border border-white/10 rounded-3xl p-8">
            <div className="text-6xl mb-5">🚘</div>

            <h2 className="text-2xl font-bold mb-3">
              خودرویی پیدا نشد
            </h2>

            <p className="text-gray-400 text-center max-w-md leading-7">
              خودرویی با مشخصات انتخاب‌شده پیدا نکردیم.
              فیلترها را تغییر بده یا همه خودروها را مشاهده کن.
            </p>

            <a
              href="/cars"
              className="mt-6 bg-blue-600 hover:bg-blue-500 px-7 py-3 rounded-xl font-bold transition"
            >
              نمایش همه خودروها
            </a>
          </div>
        )}
      </div>
    </main>
  );
}