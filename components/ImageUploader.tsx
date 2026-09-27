"use client";

import Image from "next/image";
import { useState } from "react";

type ImageUploaderProps = {
  onUpload: (imageUrl: string) => void;
};

export default function ImageUploader({
  onUpload,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setUploading(true);

    try {
      // Check file type
      if (!file.type.startsWith("image/")) {
        throw new Error("لطفاً فقط فایل تصویری انتخاب کنید.");
      }

      // 20 MB limit
      if (file.size > 20 * 1024 * 1024) {
        throw new Error(
          "حجم تصویر نباید بیشتر از 20 مگابایت باشد."
        );
      }

      // Local preview
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);

      // FormData
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      // Get raw response first
      const text = await response.text();

      let data: {
        success?: boolean;
        imageUrl?: string;
        error?: string;
      };

      try {
        data = JSON.parse(text);
      } catch {
        console.error("Server returned non-JSON:", text);

        throw new Error(
          `سرور پاسخ نامعتبر داد. وضعیت: ${response.status}`
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "آپلود تصویر ناموفق بود."
        );
      }

      if (!data.imageUrl) {
        throw new Error(
          "آدرس تصویر از Cloudinary دریافت نشد."
        );
      }

      // Send URL to parent component
      onUpload(data.imageUrl);

      console.log("IMAGE UPLOADED:", data.imageUrl);
    } catch (err) {
      console.error("IMAGE UPLOAD ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "خطا در آپلود تصویر."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">

      {/* Upload button */}
      <label
        className={`flex cursor-pointer items-center justify-center rounded-2xl border border-dashed p-6 text-center transition ${
          uploading
            ? "cursor-not-allowed border-blue-500/30 bg-blue-500/5"
            : "border-white/20 bg-slate-900 hover:border-blue-500 hover:bg-blue-500/10"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
        />

        <div className="text-white">

          {uploading ? (
            <>
              <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />

              <p className="font-bold">
                در حال آپلود تصویر...
              </p>

              <p className="mt-1 text-sm text-gray-400">
                لطفاً صبر کنید
              </p>
            </>
          ) : (
            <>
              <p className="text-lg font-bold">
                انتخاب تصویر خودرو
              </p>

              <p className="mt-2 text-sm text-gray-400">
                JPG / PNG / WEBP
              </p>

              <p className="mt-1 text-xs text-gray-500">
                حداکثر 20MB
              </p>
            </>
          )}

        </div>
      </label>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={preview}
            alt="Preview"
            width={1000}
            height={700}
            className="h-auto max-h-[400px] w-full object-cover"
          />
        </div>
      )}

    </div>
  );
}