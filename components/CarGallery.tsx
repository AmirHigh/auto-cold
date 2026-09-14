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
  const validImages = images.filter(
    (img): img is string =>
      typeof img === "string" && img.trim().length > 0
  );

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  if (validImages.length === 0) {
    return (
      <div className="relative h-[560px] rounded-3xl overflow-hidden bg-slate-900 border border-white/10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🚗</div>

          <p className="text-gray-400 text-lg">
            تصویر این خودرو موجود نیست
          </p>
        </div>
      </div>
    );
  }

  const safeSelected =
    selected >= validImages.length ? 0 : selected;

  return (
    <div>
      {/* Main Image */}
      <div
        onClick={() => setOpen(true)}
        className="relative h-[560px] rounded-3xl overflow-hidden cursor-pointer group bg-slate-900 border border-white/10"
      >
        <Image
          src={validImages[safeSelected]}
          alt="تصویر خودرو"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition" />

        {/* Zoom hint */}
        <div className="absolute bottom-5 right-5 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-sm opacity-0 group-hover:opacity-100 transition">
          برای بزرگنمایی کلیک کنید
        </div>
      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="grid grid-cols-5 gap-3 mt-4">
          {validImages.map((img, index) => (
            <button
              key={`${img}-${index}`}
              type="button"
              onClick={() => setSelected(index)}
              className={`relative h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                safeSelected === index
                  ? "border-blue-500 scale-105"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`تصویر ${index + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />

              {/* Overlay */}
              {safeSelected === index && (
                <div className="absolute inset-0 bg-blue-500/10" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={safeSelected}
        plugins={[Zoom]}
        slides={validImages.map((img) => ({
          src: img,
        }))}
      />
    </div>
  );
}