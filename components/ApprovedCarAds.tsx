import Link from "next/link";

type ApprovedAd = {
  id: number;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: string;
  city: string;
  images: {
    id: number;
    image: string;
  }[];
};

type Props = {
  ads: ApprovedAd[];
};

export default function ApprovedCarAds({ ads }: Props) {
  return (
    <section dir="rtl" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold tracking-widest text-blue-400">
            AUTO COLD MARKETPLACE
          </p>

          <h2 className="text-3xl font-black text-white sm:text-4xl">
            آگهی‌های تأییدشده کاربران
          </h2>

          <p className="mt-3 text-gray-400">
            خودروهایی که فروشندگان ثبت کرده‌اند و توسط مدیریت تأیید شده‌اند.
          </p>
        </div>

        {ads.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-900 px-6 py-12 text-center">
            <p className="text-gray-400">
              در حال حاضر آگهی تأییدشده‌ای وجود ندارد.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ads.map((ad) => {
              const image = ad.images[0]?.image;

              return (
                <article
                  key={ad.id}
                  className="overflow-hidden rounded-3xl border border-blue-500/20 bg-slate-900 shadow-xl transition hover:border-blue-500/50"
                >
                  <div className="relative flex h-60 items-center justify-center overflow-hidden bg-slate-800">
                    {image && image.startsWith("/") ? (
                      <img
                        src={image}
                        alt={`${ad.brand} ${ad.model}`}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    ) : (
                      <span className="text-gray-500">
                        تصویر موجود نیست
                      </span>
                    )}

                    <span className="absolute right-4 top-4 rounded-xl bg-green-600 px-3 py-2 text-sm font-bold text-white">
                      تأیید شده
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white">
                      {ad.brand} {ad.model}
                    </h3>

                    <p className="mt-2 text-sm text-gray-400">
                      {ad.title}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-gray-400">
                        {ad.year} • {ad.city}
                      </span>

                      <span className="font-bold text-blue-400">
                        {ad.price}
                      </span>
                    </div>

                    <div className="mt-5">
                      <Link
                        href={`/sell/${ad.id}`}
                        className="block rounded-xl bg-blue-600 py-3 text-center font-bold text-white transition hover:bg-blue-500"
                      >
                        مشاهده آگهی
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}