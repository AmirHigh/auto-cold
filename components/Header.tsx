"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[76px] md:h-[88px] flex items-center justify-between">

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 text-white hover:bg-blue-600/20 transition"
            aria-label="باز کردن منو"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2 md:gap-3"
          >
            <Image
              src="/logo.png"
              alt="AUTO COLD"
              width={48}
              height={48}
              className="w-10 h-10 md:w-[55px] md:h-[55px] object-contain"
              priority
            />

            <div>
              <h1 className="text-xl sm:text-2xl md:text-2xl font-bold text-blue-400 leading-tight">
                AUTO COLD
              </h1>

              <p className="hidden sm:block text-xs text-gray-400 mt-1">
                Luxury Car Gallery
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-white">
            <Link
              href="/"
              className="hover:text-blue-400 duration-300"
            >
              صفحه اصلی
            </Link>

            <Link
              href="/cars"
              className="hover:text-blue-400 duration-300"
            >
              خودروها
            </Link>

            <Link
              href="/buy"
              className="hover:text-blue-400 duration-300"
            >
              خرید
            </Link>

            <Link
              href="/sell"
              className="hover:text-blue-400 duration-300"
            >
              فروش
            </Link>

            <Link
              href="/contact"
              className="hover:text-blue-400 duration-300"
            >
              تماس
            </Link>
          </nav>

          {/* Desktop Order Button */}
          <Link
            href="/cars"
            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 duration-300 px-5 lg:px-6 py-3 rounded-xl text-white font-semibold shadow-lg shadow-blue-700/30"
          >
            <ShoppingCart size={19} />
            ثبت سفارش
          </Link>

          {/* Mobile Logo Balance */}
          <div className="md:hidden w-11" />
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen
              ? "max-h-[420px] opacity-100 pb-5"
              : "max-h-0 opacity-0"
          }`}
        >
          <nav className="bg-slate-900/95 border border-white/10 rounded-2xl p-4 space-y-2">

            <Link
              href="/"
              onClick={closeMenu}
              className="block rounded-xl px-4 py-3 text-white hover:bg-blue-600/20 hover:text-blue-400 transition"
            >
              صفحه اصلی
            </Link>

            <Link
              href="/cars"
              onClick={closeMenu}
              className="block rounded-xl px-4 py-3 text-white hover:bg-blue-600/20 hover:text-blue-400 transition"
            >
              خودروها
            </Link>

            <Link
              href="/buy"
              onClick={closeMenu}
              className="block rounded-xl px-4 py-3 text-white hover:bg-blue-600/20 hover:text-blue-400 transition"
            >
              خرید
            </Link>

            <Link
              href="/sell"
              onClick={closeMenu}
              className="block rounded-xl px-4 py-3 text-white hover:bg-blue-600/20 hover:text-blue-400 transition"
            >
              فروش
            </Link>

            <Link
              href="/contact"
              onClick={closeMenu}
              className="block rounded-xl px-4 py-3 text-white hover:bg-blue-600/20 hover:text-blue-400 transition"
            >
              تماس
            </Link>

            <Link
              href="/cars"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl px-4 py-3 mt-3 transition"
            >
              <ShoppingCart size={19} />
              ثبت سفارش
            </Link>

          </nav>
        </div>
      </div>
    </header>
  );
}