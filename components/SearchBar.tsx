"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();

    if (brand) params.set("brand", brand);
    if (model) params.set("model", model);
    if (year) params.set("year", year);

    router.push(`/cars?${params.toString()}`);
  }

  return (
    <section className="bg-slate-900 py-10">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-4 bg-slate-950 p-6 rounded-3xl border border-blue-500/20">

          <input
            type="text"
            placeholder="برند خودرو"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="bg-slate-800 rounded-xl p-4 outline-none text-white"
          />

          <input
            type="text"
            placeholder="مدل"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="bg-slate-800 rounded-xl p-4 outline-none text-white"
          />

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="bg-slate-800 rounded-xl p-4 text-white"
          >
            <option value="">سال ساخت</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>

          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-500 rounded-xl font-bold"
          >
            جستجوی خودرو
          </button>

        </div>

      </div>
    </section>
  );
}