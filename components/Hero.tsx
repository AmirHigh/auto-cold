import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">

        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-20 md:pt-24">

          {/* Brand */}
          <p className="text-blue-400 tracking-[4px] sm:tracking-[6px] md:tracking-[8px] uppercase font-bold text-sm sm:text-base">
            AUTO COLD
          </p>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mt-4 md:mt-6 leading-[1.15]">
            Luxury
            <br />
            Car Gallery
          </h1>

          {/* Description */}
          <p className="mt-6 md:mt-8 text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl leading-8 md:leading-9">
            تجربه خرید خودروهای لوکس وارداتی با بهترین قیمت،
            بهترین کیفیت و خدمات اختصاصی.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-8 md:mt-10 w-full sm:w-auto">

            <Link
              href="/cars"
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 px-7 md:px-8 py-3.5 md:py-4 rounded-2xl font-bold text-white transition duration-300 w-full sm:w-auto"
            >
              مشاهده خودروها
            </Link>

            <Link
              href="/cars"
              className="flex items-center justify-center border border-white/20 hover:border-blue-500 hover:bg-blue-500/10 px-7 md:px-8 py-3.5 md:py-4 rounded-2xl font-bold text-white transition duration-300 w-full sm:w-auto"
            >
              ثبت سفارش
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}