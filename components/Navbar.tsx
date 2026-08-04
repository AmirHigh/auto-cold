"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-slate-900/70 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6">

        <Link
          href="/"
          className="text-3xl font-black text-blue-400"
        >
          AUTO COLD
        </Link>

        <nav className="hidden md:flex gap-10 font-semibold">

          <Link href="/" className="hover:text-blue-400 transition">
            خانه
          </Link>

          <Link href="/cars" className="hover:text-blue-400 transition">
            خودروها
          </Link>

          <Link href="/order" className="hover:text-blue-400 transition">
            سفارش
          </Link>

          <Link href="/admin" className="hover:text-blue-400 transition">
            مدیریت
          </Link>

        </nav>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

      </div>

      {open && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl">

          <nav className="flex flex-col p-6 gap-5">

            <Link href="/" onClick={() => setOpen(false)}>
              خانه
            </Link>

            <Link href="/cars" onClick={() => setOpen(false)}>
              خودروها
            </Link>

            <Link href="/order" onClick={() => setOpen(false)}>
              سفارش
            </Link>

            <Link href="/admin" onClick={() => setOpen(false)}>
              مدیریت
            </Link>

          </nav>

        </div>
      )}
    </header>
  );
}