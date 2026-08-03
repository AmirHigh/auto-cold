import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="AUTO COLD"
            width={55}
            height={55}
          />

          <div>
            <h1 className="text-2xl font-bold text-blue-400">
              AUTO COLD
            </h1>

            <p className="text-xs text-gray-400">
              Luxury Car Gallery
            </p>
          </div>
        </div>

      <nav className="hidden md:flex gap-8 text-white">
  <Link href="/" className="hover:text-blue-400 duration-300">
    صفحه اصلی
  </Link>

  <Link href="/cars" className="hover:text-blue-400 duration-300">
    خودروها
  </Link>

  <Link href="/buy" className="hover:text-blue-400 duration-300">
    خرید
  </Link>

  <Link href="/sell" className="hover:text-blue-400 duration-300">
    فروش
  </Link>

  <Link href="/contact" className="hover:text-blue-400 duration-300">
    تماس
  </Link>
</nav>
        <

        button className="bg-blue-600 hover:bg-blue-500 duration-300 px-6 py-3 rounded-xl text-white font-semibold shadow-lg shadow-blue-700/30">
          ثبت سفارش
        </button>

      </div>
    </header>
  );
}