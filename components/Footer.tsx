import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import {
  FaInstagram,
  FaWhatsapp,
  FaTelegramPlane,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-4 gap-12">

          {/* Logo */}

          <div>

            <h2 className="text-4xl font-black text-blue-400">
              AUTO COLD
            </h2>

            <p className="text-gray-400 mt-6 leading-8">
              نمایشگاه تخصصی خودروهای لوکس وارداتی
              با بهترین قیمت، ضمانت اصالت و خدمات VIP.
            </p>

          </div>

          {/* Links */}

          <div>

            <h3 className="text-xl font-bold mb-6">
              لینک‌های سریع
            </h3>

            <div className="space-y-3">

              <Link href="/" className="block text-gray-400 hover:text-blue-400">
                صفحه اصلی
              </Link>

              <Link href="/cars" className="block text-gray-400 hover:text-blue-400">
                خودروها
              </Link>

              <Link href="/order" className="block text-gray-400 hover:text-blue-400">
                ثبت سفارش
              </Link>

              <Link href="/admin" className="block text-gray-400 hover:text-blue-400">
                پنل مدیریت
              </Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-bold mb-6">
              ارتباط با ما
            </h3>

            <div className="space-y-4 text-gray-400">

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+98 912 345 6789</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>info@autocold.ir</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>Ahvaz, Iran</span>
              </div>

            </div>

          </div>

          {/* Social */}

          <div>

            <h3 className="text-xl font-bold mb-6">
              ما را دنبال کنید
            </h3>

            <div className="flex gap-4">

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 transition"
              >
                <FaInstagram size={22} />
              </a>

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-600 transition"
              >
                <FaWhatsapp size={22} />
              </a>

              <a
                href="https://t.me/"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 transition"
              >
                <FaTelegramPlane size={22} />
              </a>

            </div>

          </div>

        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-500">

          © {new Date().getFullYear()} AUTO COLD — All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}