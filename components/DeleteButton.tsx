"use client";

export default function DeleteButton() {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm("آیا از حذف این خودرو مطمئن هستید؟")) {
          e.preventDefault();
        }
      }}
      className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg transition"
    >
      حذف
    </button>
  );
}