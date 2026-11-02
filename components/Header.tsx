
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogIn,
  UserPlus,
  LogOut,
  CarFront,
  ChevronLeft,
  Home,
  Phone,
} from "lucide-react";

type UserData = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  createdAt: Date;
} | null;

type Props = {
  user: UserData;
};

const navigationItems = [
  { href: "/", label: "صفحه اصلی", icon: Home },
  { href: "/cars", label: "خودروها", icon: CarFront },
  { href: "/buy", label: "خرید خودرو", icon: ShoppingCart },
  { href: "/sell", label: "فروش خودرو", icon: CarFront },
  { href: "/contact", label: "تماس با ما", icon: Phone },
];

export default function Header({ user }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // بستن منو با کلید Escape و جلوگیری از اسکرول پس‌زمینه
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        dir="rtl"
        className="fixed inset-x-0 top-0 z-50 border-b border-blue-500/20 bg-slate-950/95 text-white shadow-lg shadow-black/10 backdrop-blur-xl"
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between gap-3 sm:h-[80px] md:h-[88px]">
            {/* لوگو و نام برند */}
            <Link
              href="/"
              onClick={closeMenu}
              className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
              aria-label="صفحه اصلی AUTO COLD"
            >
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-blue-400/20 bg-blue-500/10 transition duration-300 group-hover:border-blue-400/60 group-hover:bg-blue-500/20 sm:h-12 sm:w-12 md:h-14 md:w-14">
                <Image
                  src="/logo.png"
                  alt="لوگوی AUTO COLD"
                  width={56}
                  height={56}
                  priority
                  sizes="(max-width: 640px) 44px, 56px"
                  className="h-full w-full object-contain p-1"
                />
              </div>

              <div className="min-w-0">
                <h1 className="whitespace-nowrap text-lg font-black leading-tight tracking-wide text-blue-400 transition group-hover:text-blue-300 sm:text-xl md:text-2xl">
                  AUTO COLD
                </h1>

                <p
                  dir="ltr"
                  className="mt-1 hidden text-[10px] tracking-[0.16em] text-slate-400 min-[380px]:block sm:text-xs"
                >
                  LUXURY CAR GALLERY
                </p>
              </div>
            </Link>

            {/* منوی دسکتاپ */}
            <nav
              aria-label="منوی اصلی"
              className="hidden items-center gap-1 lg:flex"
            >
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-blue-500/10 hover:text-blue-400 xl:px-4"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* دکمه‌های دسکتاپ */}
            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              {user ? (
                <Link
                  href="/account"
                  className="flex max-w-44 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 transition hover:border-blue-500/40 hover:bg-blue-500/10"
                >
                  <User size={19} className="shrink-0 text-blue-400" />

                  <span className="truncate text-sm font-semibold text-white">
                    {user.name}
                  </span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm font-semibold text-white transition hover:border-blue-500/40 hover:bg-blue-500/10"
                >
                  <LogIn size={18} className="text-blue-400" />
                  ورود
                </Link>
              )}

              <Link
                href="/cars"
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500 active:scale-[0.98] xl:px-5"
              >
                <ShoppingCart size={18} />
                ثبت سفارش
              </Link>
            </div>

            {/* دکمه منوی موبایل و تبلت */}
            <button
              type="button"
              onClick={() => setMenuOpen((previous) => !previous)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-blue-500/40 hover:bg-blue-500/10 sm:h-11 sm:w-11 lg:hidden"
              aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* پس‌زمینه منوی موبایل */}
        <div
          className={`fixed inset-0 top-[72px] z-40 bg-black/60 transition-opacity duration-300 sm:top-[80px] md:top-[88px] lg:hidden ${
            menuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          onClick={closeMenu}
          aria-hidden="true"
        />

        {/* پنل منوی موبایل */}
        <div
          id="mobile-navigation"
          className={`absolute inset-x-0 top-full z-50 border-b border-blue-500/20 bg-slate-950 shadow-2xl shadow-black/30 transition duration-300 ease-out lg:hidden ${
            menuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
          aria-hidden={!menuOpen}
        >
          <div className="mx-auto max-h-[calc(100dvh-72px)] max-w-7xl overflow-y-auto px-3 pb-5 pt-3 sm:max-h-[calc(100dvh-80px)] sm:px-6 md:max-h-[calc(100dvh-88px)]">
            {/* معرفی کاربر */}
            {user && (
              <Link
                href="/account"
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
                className="mb-3 flex items-center gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 transition hover:bg-blue-500/15"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                  <User size={22} className="text-blue-400" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-white">
                    {user.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    مشاهده حساب کاربری
                  </p>
                </div>

                <ChevronLeft size={19} className="text-slate-400" />
              </Link>
            )}

            {/* لینک‌های اصلی */}
            <nav aria-label="منوی موبایل" className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    tabIndex={menuOpen ? 0 : -1}
                    className="flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-blue-500/10 hover:text-blue-400 sm:text-base"
                  >
                    <Icon size={20} className="shrink-0 text-blue-400" />
                    <span className="flex-1">{item.label}</span>
                    <ChevronLeft size={17} className="text-slate-500" />
                  </Link>
                );
              })}
            </nav>

            {/* ورود و ثبت‌نام یا خروج */}
            <div className="mt-3 border-t border-white/10 pt-3">
              {user ? (
                <>
                  <Link
                    href="/account"
                    onClick={closeMenu}
                    tabIndex={menuOpen ? 0 : -1}
                    className="flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-200 transition hover:bg-blue-500/10 hover:text-blue-400 sm:text-base"
                  >
                    <User size={20} className="text-blue-400" />
                    حساب کاربری من
                  </Link>

                  <Link
                    href="/sell"
                    onClick={closeMenu}
                    tabIndex={menuOpen ? 0 : -1}
                    className="flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-200 transition hover:bg-blue-500/10 hover:text-blue-400 sm:text-base"
                  >
                    <CarFront size={20} className="text-blue-400" />
                    ثبت آگهی فروش
                  </Link>

                  <form action="/api/logout" method="POST">
                    <button
                      type="submit"
                      tabIndex={menuOpen ? 0 : -1}
                      className="flex min-h-12 w-full items-center gap-3 rounded-xl px-4 py-3 text-right text-sm text-red-400 transition hover:bg-red-500/10 sm:text-base"
                    >
                      <LogOut size={20} />
                      خروج از حساب
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    tabIndex={menuOpen ? 0 : -1}
                    className="flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-200 transition hover:bg-blue-500/10 hover:text-blue-400 sm:text-base"
                  >
                    <LogIn size={20} className="text-blue-400" />
                    ورود به حساب
                  </Link>

                  <Link
                    href="/register"
                    onClick={closeMenu}
                    tabIndex={menuOpen ? 0 : -1}
                    className="flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-200 transition hover:bg-blue-500/10 hover:text-blue-400 sm:text-base"
                  >
                    <UserPlus size={20} className="text-blue-400" />
                    ثبت‌نام
                  </Link>
                </>
              )}
            </div>

            {/* دکمه ثبت سفارش */}
            <Link
              href="/cars"
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
              className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500 active:scale-[0.99]"
            >
              <ShoppingCart size={20} />
              ثبت سفارش
            </Link>

            {/* امضای برند */}
            <p
              dir="ltr"
              className="mt-5 text-center text-[10px] tracking-[0.25em] text-slate-600"
            >
              AUTO COLD · LUXURY CAR GALLERY
            </p>
          </div>
        </div>
      </header>
    </>
  );
}

