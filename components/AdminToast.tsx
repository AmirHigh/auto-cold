"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function AdminToast({
  success,
}: {
  success?: string;
}) {
  useEffect(() => {
    if (success === "created") {
      toast.success("✅ خودرو با موفقیت اضافه شد.");
    }

    if (success === "updated") {
      toast.success("✏️ خودرو با موفقیت ویرایش شد.");
    }

    if (success === "deleted") {
      toast.success("🗑️ خودرو با موفقیت حذف شد.");
    }
  }, [success]);

  return null;
}