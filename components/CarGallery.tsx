"use client";

import { useState } from "react";
import Image from "next/image";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";

type Props = {
  images: string[];
};

export default function CarGallery({ images }: Props) {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <div>

      <div
        onClick={() => setOpen(true)}
        className="relative h-[560px] rounded-3xl overflow-hidden cursor-pointer group"
      >
        <Image
          src={images[selected]}
          alt=""
          fill
          priority
          className="object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition" />
      </div>

      <div className="grid grid-cols-5 gap-3 mt-4">

        {images.map((img, index) => (

          <button
            key={index}
            onClick={() => setSelected(index)}
            className={`relative h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
              selected === index
                ? "border-blue-500 scale-105"
                : "border-transparent opacity-70 hover:opacity-100"
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

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={selected}
        plugins={[Zoom]}
        slides={images.map((img) => ({
          src: img,
        }))}
      />

    </div>
  );
}