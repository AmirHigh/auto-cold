import { loginAdmin } from "./actions";

export default function AdminLoginPage() {
  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-white"
    >
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="mb-3 font-bold text-blue-400">
            AUTO COLD
          </p>

          <h1 className="text-3xl font-bold">
            ورود مدیریت
          </h1>

          <p className="mt-3 text-gray-400">
            ورود اختصاصی مدیر گالری خودرو
          </p>
        </div>

        <form
          action={loginAdmin}
          className="space-y-5 rounded-3xl border border-blue-500/20 bg-slate-900 p-8 shadow-2xl"
        >
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-gray-300"
            >
              نام کاربری مدیر
            </label>

            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              maxLength={100}
              dir="ltr"
              className="w-full rounded-xl border border-white/10 bg-slate-800 p-4 outline-none focus:border-blue-500"
              placeholder="admin"
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
              dir="ltr"
              className="w-full rounded-xl border border-white/10 bg-slate-800 p-4 outline-none focus:border-blue-500"
              placeholder="رمز عبور مدیر"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-4 font-bold transition hover:bg-blue-500"
          >
            ورود به پنل مدیریت
          </button>

          <div className="text-center">
            <a
              href="/"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              بازگشت به سایت
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}