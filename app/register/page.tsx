import Link from "next/link";
import { registerUser } from "./actions";

export default function RegisterPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-16"
    >
      <div className="w-full max-w-lg">

        <div className="text-center mb-10">
          <p className="text-blue-400 font-bold text-lg mb-3">
            AUTO COLD
          </p>

          <h1 className="text-4xl font-bold mb-3">
            ثبت‌نام
          </h1>

          <p className="text-gray-400">
            برای خرید و ثبت آگهی خودرو حساب بسازید.
          </p>
        </div>

        <form
          action={registerUser}
          className="bg-slate-900 border border-blue-500/20 rounded-3xl p-8 space-y-5 shadow-2xl"
        >

          <div>
            <label className="block mb-2 text-gray-300">
              نام و نام خانوادگی
            </label>

            <input
              name="name"
              type="text"
              required
              placeholder="مثلاً امیر احمدی"
              className="w-full rounded-xl bg-slate-800 border border-white/10 p-4 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">
              ایمیل
            </label>

            <input
              name="email"
              type="email"
              required
              placeholder="example@gmail.com"
              dir="ltr"
              className="w-full rounded-xl bg-slate-800 border border-white/10 p-4 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">
              شماره موبایل
            </label>

            <input
              name="phone"
              type="tel"
              placeholder="09123456789"
              dir="ltr"
              className="w-full rounded-xl bg-slate-800 border border-white/10 p-4 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">
              شهر
            </label>

            <input
              name="city"
              type="text"
              placeholder="مثلاً اهواز"
              className="w-full rounded-xl bg-slate-800 border border-white/10 p-4 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">
              رمز عبور
            </label>

            <input
              name="password"
              type="password"
              required
              minLength={8}
              placeholder="حداقل ۸ کاراکتر"
              dir="ltr"
              className="w-full rounded-xl bg-slate-800 border border-white/10 p-4 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold text-lg transition"
          >
            ثبت‌نام
          </button>

          <div className="text-center text-gray-400 pt-2">
            قبلاً حساب ساخته‌اید؟

            <Link
              href="/login"
              className="text-blue-400 hover:text-blue-300 mr-2"
            >
              ورود
            </Link>
          </div>

        </form>
      </div>
    </main>
  );
}