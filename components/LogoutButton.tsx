"use client";

export default function LogoutButton() {
  async function logout() {
    await fetch("/api/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  }

  return (
    <button
      onClick={logout}
      className="bg-red-600 hover:bg-red-500 px-5 py-3 rounded-xl font-bold transition"
    >
      خروج
    </button>
  );
}