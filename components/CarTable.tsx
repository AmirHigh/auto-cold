"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import { deleteCar } from "@/app/admin/actions";

type Car = {
id: number;
brand: string;
model: string;
year: number;
price: string;
image: string | null;
description: string | null;
status: string;
createdAt: Date;
updatedAt: Date;
};

type Props = {
cars: Car[];
};

export default function CarTable({ cars }: Props) {
const [search, setSearch] = useState("");

const filteredCars = useMemo(() => {
const query = search.trim().toLowerCase();


if (!query) {
  return cars;
}

return cars.filter((car) =>
  `${car.brand} ${car.model} ${car.year}`
    .toLowerCase()
    .includes(query)
);


}, [cars, search]);

async function handleDeleteCar(formData: FormData): Promise<void> {
const id = Number(formData.get("carId"));


if (!Number.isInteger(id) || id <= 0) {
  alert("شناسه خودرو معتبر نیست.");
  return;
}

const confirmed = window.confirm(
  "آیا مطمئنی می‌خواهی این خودرو را حذف کنی؟"
);

if (!confirmed) {
  return;
}

try {
  const result = await deleteCar(id);

  if (result.success) {
    alert("خودرو با موفقیت حذف شد.");
    window.location.reload();
  } else {
    alert(result.message || "خطا در حذف خودرو");
  }
} catch (error) {
  console.error("DELETE CAR ERROR:", error);
  alert("خطایی هنگام حذف خودرو رخ داد.");
}


}

return ( <div className="space-y-6">
{/* Search */}
<input
type="text"
autoComplete="off"
spellCheck={false}
value={search}
onChange={(e) => setSearch(e.target.value)}
placeholder="🔍 جستجوی برند، مدل یا سال..."
className="w-full rounded-xl border-2 border-blue-500 bg-white p-4 text-black outline-none placeholder:text-gray-500"
/>

```
  {/* Table */}
  <div className="overflow-x-auto rounded-3xl border border-blue-500/20">
    <table className="w-full min-w-[800px]">
      <thead className="bg-slate-900">
        <tr>
          <th className="p-4 text-right">خودرو</th>
          <th className="p-4 text-right">سال</th>
          <th className="p-4 text-right">قیمت</th>
          <th className="p-4 text-center">وضعیت</th>
          <th className="p-4 text-center">عملیات</th>
        </tr>
      </thead>

      <tbody>
        {filteredCars.map((car) => (
          <tr
            key={car.id}
            className="border-t border-white/10 transition hover:bg-white/5"
          >
            {/* Car */}
            <td className="p-4">
              <div className="flex items-center gap-3">
                {car.image ? (
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-800">
                    <Image
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs text-gray-400">
                    بدون تصویر
                  </div>
                )}

                <div>
                  <p className="font-semibold text-white">
                    {car.brand} {car.model}
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    شناسه: {car.id}
                  </p>
                </div>
              </div>
            </td>

            {/* Year */}
            <td className="p-4 text-white">{car.year}</td>

            {/* Price */}
            <td className="p-4 text-white">{car.price}</td>

            {/* Status */}
            <td className="p-4 text-center">
              {car.status === "AVAILABLE" ? (
                <span className="inline-block rounded-lg border border-green-500/20 bg-green-500/10 px-3 py-2 text-sm text-green-400">
                  موجود
                </span>
              ) : (
                <span className="inline-block rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-3 py-2 text-sm text-yellow-400">
                  {car.status}
                </span>
              )}
            </td>

            {/* Actions */}
            <td className="p-4">
              <div className="flex justify-center gap-3">
                {/* Edit */}
                <Link
                  href={`/admin/edit-car/${car.id}`}
                  className="rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-black transition hover:bg-yellow-400"
                >
                  ویرایش
                </Link>

                {/* Delete */}
                <form action={handleDeleteCar}>
                  <input
                    type="hidden"
                    name="carId"
                    value={car.id}
                  />

                  <DeleteButton />
                </form>
              </div>
            </td>
          </tr>
        ))}

        {/* Empty */}
        {filteredCars.length === 0 && (
          <tr>
            <td
              colSpan={5}
              className="p-8 text-center text-gray-400"
            >
              خودرویی پیدا نشد.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>


);
}
