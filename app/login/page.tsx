import Link from "next/link";
import { loginUser } from "./actions";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams;
  const error = params.error;

  const errorMessages: Record<string, string> = {
    invalid: "لطفاً ایمیل و رمز عبور معتبر وارد کنید.",
    credentials: "ایمیل یا رمز عبور اشتباه است.",
    server: "خطایی در سرور رخ داد. لطفاً دوباره تلاش کنید.",
  };

  const errorMessage = error
    ? errorMessages[error] ?? null
    : null;

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-white"
    >
      <div className="w-full max-w-lg">
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="mb-3 inline-block text-lg font-bold text-blue-400"
          >
            AUTO COLD
          </Link>

          <h1 className="mb-3 text-4xl font-bold">
            ورود به حساب کاربری
          </h1>

          <p className="text-gray-400">
            برای ادامه خرید و مدیریت آگهی‌های خود وارد شوید.
          </p>
        </div>

        <form
          action={loginUser}
          className="space-y-5 rounded-3xl border border-blue-500/20 bg-slate-900 p-8 shadow-2xl"
        >
          {errorMessage && (
            <div
              role="alert"
              className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300"
            >
              {errorMessage}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-gray-300"
            >
              ایمیل
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="example@gmail.com"
              dir="ltr"
              className="w-full rounded-xl border border-white/10 bg-slate-800 p-4 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-gray-300"
            >
              رمز عبور
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              maxLength={128}
              placeholder="رمز عبور خود را وارد کنید"
              dir="ltr"
              className="w-full rounded-xl border border-white/10 bg-slate-800 p-4 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-4 text-lg font-bold transition hover:bg-blue-500"
          >
            ورود
          </button>

          <div className="pt-2 text-center text-gray-400">
            هنوز حساب ندارید؟

            <Link
              href="/register"
              className="mr-2 text-blue-400 hover:text-blue-300"
            >
              ثبت‌نام
            </Link>
          </div>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-gray-400 transition hover:text-white"
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}