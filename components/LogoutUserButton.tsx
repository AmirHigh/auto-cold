"use client";

import { logoutUser } from "@/app/login/logout";

export default function LogoutUserButton() {
  return (
    <button
      type="button"
      onClick={() => logoutUser()}
      className="rounded-xl bg-red-600 px-4 py-2 font-bold text-white transition hover:bg-red-500"
    >
      خروج
    </button>
  );
}