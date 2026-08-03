"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DeleteButton from "./DeleteButton";

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
  deleteAction: (id: number) => Promise<void>;
};

export default function CarTable({
  cars,
  deleteAction,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredCars = useMemo(() => {
    if (!search.trim()) return cars;

    return cars.filter((car) =>
      `${car.brand} ${car.model} ${car.year}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [cars, search]);

  return (
    <div className="space-y-6">
      <input
        key="search"
        type="text"
        autoComplete="off"
        spellCheck={false}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 جستجوی برند، مدل یا سال..."
        className="w-full p-4 rounded-xl bg-white text-black border-2 border-blue-500 outline-none"
      />

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
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={car.image}
                      alt={car.model}
                      width={80}
                      height={60}
                      className="rounded-xl w-20 h-14 object-cover"
                    />

                    <div>
                      <p className="font-bold">{car.brand}</p>
                      <p className="text-sm text-gray-400">{car.model}</p>
                    </div>
                  </div>
                </td>

                <td className="p-4">{car.year}</td>

                <td className="p-4 text-green-400 font-bold">
                  {car.price}
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <Link
                      href={`/admin/edit-car/${car.id}`}
                      className="bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded-lg"
                    >
                      ویرایش
                    </Link>

                    <form action={deleteAction.bind(null, car.id)}>
                      <DeleteButton />
                    </form>
                  </div>
                </td>
              </tr>
            ))}

            {filteredCars.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center p-8 text-gray-400"
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