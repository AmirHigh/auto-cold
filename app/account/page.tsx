import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/current-user";
import LogoutUserButton from "@/components/LogoutUserButton";

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-950 text-white px-6 py-32"
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-blue-400 font-bold mb-2">
            AUTO COLD
          </p>

          <h1 className="text-4xl font-bold">
            حساب کاربری من
          </h1>

          <p className="text-gray-400 mt-3">
            مدیریت اطلاعات و آگهی‌های شما
          </p>
        </div>

        {/* User Info */}
        <div className="bg-slate-900 border border-blue-500/20 rounded-3xl p-8 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            اطلاعات حساب
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="bg-slate-800 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-2">
                نام
              </p>

              <p className="font-bold text-lg">
                {user.name}
              </p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-2">
                ایمیل
              </p>

              <p
                className="font-bold text-lg"
                dir="ltr"
              >
                {user.email}
              </p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-2">
                شماره موبایل
              </p>

              <p
                className="font-bold text-lg"
                dir="ltr"
              >
                {user.phone || "ثبت نشده"}
              </p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-2">
                شهر
              </p>

              <p className="font-bold text-lg">
                {user.city || "ثبت نشده"}
              </p>
            </div>

          </div>

        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <Link
            href="/sell"
            className="bg-blue-600 hover:bg-blue-500 rounded-2xl p-6 transition"
          >
            <h3 className="text-xl font-bold mb-2">
              🚗 ثبت آگهی خودرو
            </h3>

            <p className="text-blue-100">
              خودروی خود را برای فروش ثبت کنید.
            </p>
          </Link>

          <Link
            href="/account/ads"
            className="bg-slate-900 border border-white/10 hover:border-blue-500/40 rounded-2xl p-6 transition"
          >
            <h3 className="text-xl font-bold mb-2">
              📋 آگهی‌های من
            </h3>

            <p className="text-gray-400">
              مشاهده و مدیریت آگهی‌های شما.
            </p>
          </Link>

          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-2">
              خروج
            </h3>

            <p className="text-gray-400 mb-5">
              خروج از حساب کاربری
            </p>

            <LogoutUserButton />
          </div>

        </div>

      </div>
    </main>
  );
}