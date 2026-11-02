"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";

type CarImage = {
  id: number;
  image: string;
};

type CarImageGalleryProps = {
  images: CarImage[];
  title: string;
};

export default function CarImageGallery({
  images,
  title,
}: CarImageGalleryProps) {
  const validImages = images.filter(
    (item) =>
      typeof item.image === "string" &&
      item.image.startsWith("/")
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = validImages[activeIndex];

  function showPrevious() {
    setActiveIndex((current) =>
      current === 0 ? validImages.length - 1 : current - 1
    );
  }

  function showNext() {
    setActiveIndex((current) =>
      current === validImages.length - 1 ? 0 : current + 1
    );
  }

  if (validImages.length === 0) {
    return (
      <div className="flex h-[380px] flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl border border-blue-500/20 bg-slate-900 sm:h-[500px]">
        <Images size={56} className="text-blue-400" />
        <p className="text-gray-400">تصویری برای این خودرو ثبت نشده است.</p>
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="group relative h-[380px] overflow-hidden rounded-3xl border border-blue-500/20 bg-slate-900 sm:h-[500px]">
        <Image
          key={activeImage.id}
          src={activeImage.image}
          alt={`${title} - تصویر ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition duration-500"
        />

        {validImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="تصویر قبلی"
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white opacity-100 transition hover:bg-blue-600 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronRight size={24} />
            </button>

            <button
              type="button"
              onClick={showNext}
              aria-label="تصویر بعدی"
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white opacity-100 transition hover:bg-blue-600 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-white">
              {activeIndex + 1} / {validImages.length}
            </div>
          </>
        )}
      </div>

      {validImages.length > 1 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {validImages.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`نمایش تصویر ${index + 1}`}
              aria-pressed={activeIndex === index}
              className={`relative h-24 overflow-hidden rounded-xl border-2 transition sm:h-28 ${
                activeIndex === index
                  ? "border-blue-400 ring-2 ring-blue-400/20"
                  : "border-white/10 opacity-70 hover:border-blue-400/60 hover:opacity-100"
              }`}
            >
              <Image
                src={image.image}
                alt={`${title} - تصویر کوچک ${index + 1}`}
                fill
                sizes="200px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}