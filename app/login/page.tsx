import { login } from "./actions";


export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950">
      <form
        action={login}
        className="bg-slate-900 p-8 rounded-2xl w-[400px] space-y-5"
      >
        <h1 className="text-3xl font-bold text-center text-blue-400">
          ورود ادمین
        </h1>

        <input
          name="username"
          placeholder="نام کاربری"
          className="w-full p-3 rounded-lg bg-slate-800 text-white outline-none"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="رمز عبور"
          className="w-full p-3 rounded-lg bg-slate-800 text-white outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold text-white"
        >
          ورود
        </button>
      </form>
    </main>
  );
}