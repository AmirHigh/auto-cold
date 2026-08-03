"use client";

import { useState } from "react";

type Props = {
  onUploaded: (urls: string[]) => void;
};

export default function ImageUploader({ onUploaded }: Props) {
  const [uploading, setUploading] = useState(false);

  async function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    setUploading(true);

    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        uploadedUrls.push(data.imageUrl);
      }
    }

    setUploading(false);

    onUploaded(uploadedUrls);
  }

  return (
    <div className="space-y-3">

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="w-full"
      />

      {uploading && (
        <p className="text-blue-400">
          در حال آپلود تصاویر...
        </p>
      )}

    </div>
  );
}