import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-28 bg-slate-950">

      <div className="max-w-6xl mx-auto px-6">

        <div className="rounded-[40px] overflow-hidden relative">

          {/* Background */}

          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-900" />

          <div className="absolute inset-0 bg-black/20" />

          {/* Content */}

          <div className="relative z-10 px-12 py-20 text-center">

            <h2 className="text-5xl font-black text-white">

              خودروی رویایی خود را امروز پیدا کنید

            </h2>

            <p className="text-xl text-gray-200 mt-8 max-w-3xl mx-auto leading-9">

              مجموعه‌ای از بهترین خودروهای لوکس وارداتی با
              ضمانت اصالت، قیمت رقابتی و خدمات اختصاصی.

            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5 mt-12">

              <Link
                href="/cars"
                className="px-10 py-4 rounded-2xl bg-white text-slate-900 font-black hover:scale-105 duration-300"
              >
                مشاهده خودروها
              </Link>

              <Link
                href="/order"
                className="px-10 py-4 rounded-2xl border-2 border-white text-white font-black hover:bg-white hover:text-slate-900 duration-300"
              >
                ثبت سفارش
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}