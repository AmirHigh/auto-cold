import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">

      {/* Background */}

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000')",
        }}
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}

      <div className="relative z-10 h-full flex items-center">

        <div className="max-w-7xl mx-auto px-6">

          <p className="text-blue-400 tracking-[8px] uppercase font-bold">
            AUTO COLD
          </p>

          <h1 className="text-7xl font-black mt-6 leading-tight">

            Luxury

            <br />

            Car Gallery

          </h1>

          <p className="mt-8 text-gray-300 text-xl max-w-2xl leading-9">

            تجربه خرید خودروهای لوکس وارداتی با بهترین قیمت،
            بهترین کیفیت و خدمات اختصاصی.

          </p>

          <div className="flex gap-5 mt-10">

            <Link
              href="/cars"
              className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-bold"
            >
              مشاهده خودروها
            </Link>

            <Link
              href="/order"
              className="border border-white/20 hover:border-blue-500 px-8 py-4 rounded-2xl font-bold"
            >
              ثبت سفارش
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}