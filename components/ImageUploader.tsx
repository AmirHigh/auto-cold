"use client";

import { useRef, useState } from "react";

type ImageUploaderProps = {
  onUploaded?: (urls: string[]) => void;
  currentCount?: number;
};

export default function ImageUploader({
  onUploaded,
  currentCount = 0,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    setError("");
    setSuccess("");

    const remaining = 10 - currentCount;

    if (remaining <= 0) {
      setError("حداکثر ۱۰ تصویر مجاز است.");
      event.target.value = "";
      return;
    }

    if (files.length > remaining) {
      setError(
        `فقط می‌توانید ${remaining} تصویر دیگر انتخاب کنید.`
      );
      event.target.value = "";
      return;
    }

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        setError("فقط فایل تصویری مجاز است.");
        event.target.value = "";
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError(`حجم تصویر ${file.name} بیشتر از ۱۰ مگابایت است.`);
        event.target.value = "";
        return;
      }
    }

    setUploading(true);

    const uploadedUrls: string[] = [];
    const failedFiles: string[] = [];

    try {
      for (const file of files) {
        try {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();

          if (!response.ok || !data.success || !data.imageUrl) {
            throw new Error(data.error || "آپلود ناموفق بود.");
          }

          uploadedUrls.push(data.imageUrl);
        } catch (uploadError) {
          console.error("Upload error:", uploadError);
          failedFiles.push(file.name);
        }
      }

      if (uploadedUrls.length > 0) {
        onUploaded?.(uploadedUrls);
        setSuccess(
          `${uploadedUrls.length} تصویر با موفقیت آپلود شد.`
        );
      }

      if (failedFiles.length > 0) {
        setError(
          `آپلود ${failedFiles.length} تصویر ناموفق بود. دوباره تلاش کنید.`
        );
      }
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
        <label className="mb-2 block text-right text-white">
          تصاویر خودرو
        </label>

        <p className="mb-3 text-sm text-gray-400">
          حداکثر ۱۰ تصویر | حجم هر تصویر حداکثر ۱۰ مگابایت
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          disabled={uploading || currentCount >= 10}
          className="block w-full text-sm text-gray-300
          file:mr-4 file:rounded-xl file:border-0
          file:bg-blue-600 file:px-5 file:py-3
          file:text-white hover:file:bg-blue-500
          file:cursor-pointer disabled:opacity-50"
        />

        <p className="mt-2 text-sm text-blue-400">
          {currentCount} از ۱۰ تصویر انتخاب شده
        </p>
      </div>

      {uploading && (
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-center text-blue-400">
          در حال آپلود تصاویر، لطفاً صبر کنید...
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-center text-green-400">
          {success}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}