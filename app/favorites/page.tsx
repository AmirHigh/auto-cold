import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import FavoriteButton from "@/components/FavoriteButton";

export const dynamic = "force-dynamic";

export default async function FavoritesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auto_cold_session")?.value;

  if (!token) {
    redirect("/login");
  }

  const payload = await verifyToken(token);

  if (
    !payload ||
    typeof payload.userId !== "number" ||
    !Number.isInteger(payload.userId)
  ) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.userId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const favorites = await prisma.favorite.findMany({
    where: {
      userId: user.id,
    },
    include: {
      car: {
        include: {
          images: {
            orderBy: {
              createdAt: "asc",
            },
            take: 1,
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold tracking-widest text-blue-400">
            AUTO COLD
          </p>

          <h1 className="text-3xl font-black sm:text-4xl">
            خودروهای موردعلاقه{" "}
            <span className="text-red-500">♥</span>
          </h1>

          <p className="mt-3 text-gray-400">
            {user.name}، خودروهایی که ذخیره کرده‌ای اینجا قرار دارند.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-900 px-6 py-16 text-center">
            <div className="mb-5 text-6xl text-red-500">♡</div>

            <h2 className="text-xl font-bold">
              هنوز خودرویی ذخیره نکرده‌ای
            </h2>

            <p className="mt-3 text-gray-400">
              از میان خودروهای گالری، موارد دلخواهت را انتخاب کن.
            </p>

            <Link
              href="/cars"
              className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-500"
            >
              مشاهده خودروها
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-gray-400">
              {favorites.length} خودرو ذخیره شده است.
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {favorites.map(({ car }) => {
                const image =
                  car.images[0]?.image || car.image;

                const isSold = car.status === "SOLD";
                const isReserved = car.status === "RESERVED";

                return (
                  <article
                    key={car.id}
                    className="overflow-hidden rounded-3xl border border-blue-500/20 bg-slate-900 shadow-xl transition hover:border-blue-500/50"
                  >
                    <div className="relative h-60 bg-slate-800 sm:h-64">
                      <FavoriteButton carId={car.id} />

                      {image && image.startsWith("/") ? (
                        <Image
                          src={image}
                          alt={`${car.brand} ${car.model}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-500">
                          تصویر موجود نیست
                        </div>
                      )}

                      <span
                        className={`absolute right-4 top-4 rounded-xl px-3 py-2 text-sm font-bold ${
                          isSold
                            ? "bg-red-600 text-white"
                            : isReserved
                            ? "bg-yellow-500 text-black"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {isSold
                          ? "فروخته شد"
                          : isReserved
                          ? "رزرو شده"
                          : "موجود"}
                      </span>
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <h2 className="text-xl font-bold">
                          {car.brand} {car.model}
                        </h2>

                        <span className="whitespace-nowrap text-sm text-blue-400">
                          {car.year}
                        </span>
                      </div>

                      <div className="mb-6 flex items-center justify-between gap-3">
                        <span className="text-gray-400">
                          قیمت
                        </span>

                        <span
                          className={`text-lg font-bold ${
                            isSold
                              ? "text-gray-500 line-through"
                              : "text-blue-400"
                          }`}
                        >
                          {car.price}
                        </span>
                      </div>

                      <Link
                        href={`/cars/${car.id}`}
                        className="block w-full rounded-xl bg-blue-600 py-3 text-center font-bold text-white transition hover:bg-blue-500"
                      >
                        مشاهده جزئیات
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}