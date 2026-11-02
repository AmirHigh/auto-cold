"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type ImageUploaderProps = {
  onUploaded?: (urls: string[]) => void;
};

export default function ImageUploader({
  onUploaded,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setSuccess("");
    setImageUrl("");

    if (!file.type.startsWith("image/")) {
      setError("لطفاً فقط فایل تصویری انتخاب کنید.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("حجم تصویر نباید بیشتر از 10 مگابایت باشد.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();

      let data: {
        success?: boolean;
        imageUrl?: string;
        error?: string;
      };

      try {
        data = JSON.parse(text);
      } catch {
        console.error("Invalid server response:", text);
        throw new Error("سرور پاسخ نامعتبر داد.");
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "آپلود تصویر ناموفق بود."
        );
      }

      if (!data.imageUrl) {
        throw new Error("آدرس تصویر دریافت نشد.");
      }

      setImageUrl(data.imageUrl);
      setSuccess("تصویر با موفقیت آپلود شد.");

      // ارسال URL به AddCarForm
      onUploaded?.([data.imageUrl]);
    } catch (error) {
      console.error("Image upload error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "آپلود تصویر ناموفق بود."
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className="w-full space-y-4">

      <div>
        <label className="block text-white mb-2 text-right">
          تصویر خودرو
        </label>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="block w-full text-sm text-gray-300
          file:mr-4 file:py-3 file:px-5
          file:rounded-xl file:border-0
          file:bg-blue-600 file:text-white
          hover:file:bg-blue-500
          file:cursor-pointer
          disabled:opacity-50"
        />
      </div>

      {uploading && (
        <div className="rounded-xl bg-blue-500/10 border border-blue-500/30 p-4 text-blue-400 text-center">
          در حال آپلود تصویر...
        </div>
      )}

      {success && (
        <div className="rounded-xl bg-green-500/10 border border-green-500/30 p-4 text-green-400 text-center">
          {success}
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-red-400 text-center">
          {error}
        </div>
      )}

      {imageUrl && (
        <div className="relative w-full max-w-md mx-auto aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={imageUrl}
            alt="Uploaded car"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 448px"
          />
        </div>
      )}

    </div>
  );
}