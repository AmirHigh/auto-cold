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
  image: string;
};

type Props = {
  cars: Car[];
};

export default function CarTable({ cars }: Props) {
  const [search, setSearch] = useState("");

  const filteredCars = useMemo(() => {
    if (!search.trim()) {
      return cars;
    }

    return cars.filter((car) =>
      `${car.brand} ${car.model} ${car.year}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [cars, search]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <input
        type="text"
        autoComplete="off"
        spellCheck={false}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 جستجوی برند، مدل یا سال..."
        className="w-full rounded-xl border-2 border-blue-500 bg-white p-4 text-black outline-none"
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-3xl border border-blue-500/20">
        <table className="w-full">
          <thead className="bg-slate-900">
            <tr>
              <th className="p-4 text-right">خودرو</th>
              <th className="p-4 text-right">سال</th>
              <th className="p-4 text-right">قیمت</th>
              <th className="p-4 text-center">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {filteredCars.map((car) => (
              <tr
                key={car.id}
                className="border-t border-slate-800 hover:bg-slate-900"
              >
                {/* Car */}
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={car.image}
                      alt={car.model}
                      width={80}
                      height={60}
                      className="h-14 w-20 rounded-xl object-cover"
                    />

                    <div>
                      <p className="font-bold">{car.brand}</p>

                      <p className="text-sm text-gray-400">
                        {car.model}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Year */}
                <td className="p-4">
                  {car.year}
                </td>

                {/* Price */}
                <td className="p-4 font-bold text-green-400">
                  {car.price}
                </td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    {/* Edit */}
                    <Link
                      href={`/admin/edit-car/${car.id}`}
                      className="rounded-lg bg-yellow-500 px-4 py-2 hover:bg-yellow-400"
                    >
                      ویرایش
                    </Link>

                    {/* Delete */}
                    <form action={deleteCar.bind(null, car.id)}>
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
                  colSpan={4}
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