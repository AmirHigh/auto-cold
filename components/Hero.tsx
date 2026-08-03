import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-black overflow-hidden pt-28">

      <div className="absolute inset-0 opacity-20">
        <Image
          src="/hero-car.png"
          alt="Hero Car"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center justify-between min-h-[85vh]">

        <div className="max-w-2xl">

          <span className="text-blue-400 font-semibold tracking-widest">
            PREMIUM CAR DEALERSHIP
          </span>

          <h1 className="text-6xl lg:text-7xl font-extrabold text-white leading-tight mt-5">
            AUTO
            <span className="text-blue-400"> COLD</span>
          </h1>

          <p className="text-gray-300 text-xl mt-6 leading-9">
            خرید و فروش خودروهای لوکس داخلی و خارجی
            <br />
            ثبت سفارش آنلاین، پرداخت ریالی، دلاری و درهم
          </p>

          <div className="flex gap-5 mt-10">

            <button className="bg-blue-600 hover:bg-blue-500 duration-300 px-8 py-4 rounded-xl font-bold">
              خرید خودرو
            </button>

            <button className="border border-blue-500 hover:bg-blue-500 duration-300 px-8 py-4 rounded-xl">
              فروش خودرو
            </button>

          </div>

        </div>

        <div className="relative w-full lg:w-[650px] h-[500px] mt-16 lg:mt-0">

          <Image
            src="/hero-car.png"
            alt="Luxury Car"
            fill
            className="object-contain drop-shadow-[0_0_60px_rgba(59,130,246,0.5)]"
            priority
          />

        </div>

      </div>

    </section>
  );
}