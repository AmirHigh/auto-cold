"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
};

export default function CarGallery({ images }: Props) {
  const [selected, setSelected] = useState(0);

  return (
    <div>

      <div className="relative h-[520px] rounded-3xl overflow-hidden border border-blue-500/20">

        <Image
          src={images[selected]}
          alt=""
          fill
          className="object-cover"
        />

      </div>

      <div className="flex gap-4 mt-5 overflow-x-auto">

        {images.map((img, index) => (

          <button
            key={index}
            type="button"
            onClick={() => setSelected(index)}
            className={`relative w-28 h-20 rounded-xl overflow-hidden border-2 transition ${
              selected === index
                ? "border-blue-500"
                : "border-slate-700"
            }`}
          >
            <Image
              src={img}
              alt=""
              fill
              className="object-cover"
            />
          </button>

        ))}

      </div>

    </div>
  );
}