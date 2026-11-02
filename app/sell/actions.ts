"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

export async function createCarAd(formData: FormData) {
  const savedFiles: string[] = [];
  let adId: number | null = null;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auto_cold_session")?.value;

    if (!token) {
      return { success: false, message: "ابتدا وارد حساب کاربری شوید." };
    }

    const payload = await verifyToken(token);
    const userId = Number(payload?.userId);

    if (!Number.isInteger(userId) || userId <= 0) {
      return { success: false, message: "جلسه ورود معتبر نیست." };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      return { success: false, message: "کاربر پیدا نشد." };
    }

    const title = String(formData.get("title") ?? "").trim();
    const brand = String(formData.get("brand") ?? "").trim();
    const model = String(formData.get("model") ?? "").trim();
    const year = Number(formData.get("year"));
    const price = String(formData.get("price") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const city = String(formData.get("city") ?? "").trim();

    if (!title || !brand || !model || !price || !phone || !city || !Number.isInteger(year)) {
      return { success: false, message: "لطفاً تمام فیلدهای ضروری را تکمیل کنید." };
    }

    if (year < 1900 || year > 2100) {
      return { success: false, message: "سال خودرو معتبر نیست." };
    }

    const selectedFiles = formData.getAll("images");
    const imageFiles = selectedFiles.filter(
      (item): item is File => item instanceof File && item.size > 0
    );

    if (imageFiles.length > 5) {
      return { success: false, message: "حداکثر می‌توانید ۵ تصویر انتخاب کنید." };
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const extensions: Record<string, string> = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
    };

    for (const file of imageFiles) {
      if (!allowedTypes.includes(file.type)) {
        return { success: false, message: "فرمت تصاویر باید JPG، PNG یا WebP باشد." };
      }

      if (file.size > 8 * 1024 * 1024) {
        return { success: false, message: "حجم هر تصویر نباید بیشتر از ۸ مگابایت باشد." };
      }
    }

    const ad = await prisma.carAd.create({
      data: {
        title,
        brand,
        model,
        year,
        price,
        description: description || null,
        phone,
        city,
        status: "PENDING",
        user: { connect: { id: userId } },
      },
    });

    adId = ad.id;

    const uploadDirectory = path.join(process.cwd(), "public", "uploads", "ads");
    await fs.mkdir(uploadDirectory, { recursive: true });

    for (let index = 0; index < imageFiles.length; index++) {
      const file = imageFiles[index];
      const fileName = `ad-${ad.id}-${Date.now()}-${index}${extensions[file.type]}`;
      const filePath = path.join(uploadDirectory, fileName);

      await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
      savedFiles.push(filePath);

      await prisma.carAdImage.create({
        data: {
          image: `/uploads/ads/${fileName}`,
          carAdId: ad.id,
        },
      });
    }

    revalidatePath("/");
    revalidatePath("/sell");
    revalidatePath("/admin");

    return {
      success: true,
      message: imageFiles.length
        ? "آگهی و تصاویر با موفقیت ثبت شدند."
        : "آگهی ثبت شد؛ تصویری انتخاب نشده بود.",
    };
  } catch (error) {
    console.error("CREATE CAR AD ERROR:", error);

    await Promise.all(
      savedFiles.map((filePath) => fs.unlink(filePath).catch(() => undefined))
    );

    if (adId !== null) {
      try {
        await prisma.carAdImage.deleteMany({ where: { carAdId: adId } });
        await prisma.carAd.delete({ where: { id: adId } });
      } catch (cleanupError) {
        console.error("CREATE AD CLEANUP ERROR:", cleanupError);
      }
    }

    return {
      success: false,
      message: "ثبت آگهی ناموفق بود. ترمینال را بررسی کنید.",
    };
  }
}

export async function deleteMyCarAd(id: number) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auto_cold_session")?.value;

    if (!token) {
      return { success: false, message: "ابتدا وارد حساب کاربری شوید." };
    }

    const payload = await verifyToken(token);
    const userId = Number(payload?.userId);

    if (!Number.isInteger(userId) || userId <= 0 || !Number.isInteger(id) || id <= 0) {
      return { success: false, message: "اطلاعات کاربر یا آگهی معتبر نیست." };
    }

    const ad = await prisma.carAd.findFirst({
      where: { id, userId },
      include: { images: true },
    });

    if (!ad) {
      return {
        success: false,
        message: "آگهی پیدا نشد یا متعلق به حساب شما نیست.",
      };
    }

    await prisma.$transaction(async (tx) => {
      await tx.carAdImage.deleteMany({ where: { carAdId: id } });
      await tx.carAd.delete({ where: { id, userId } });
    });

    const uploadDirectory = path.join(process.cwd(), "public", "uploads", "ads");

    for (const image of ad.images) {
      if (!image.image.startsWith("/uploads/ads/")) continue;

      const fileName = path.basename(image.image);
      if (!fileName || fileName === "." || fileName === "..") continue;

      await fs.unlink(path.join(uploadDirectory, fileName)).catch((error) => {
        console.error("DELETE AD IMAGE ERROR:", error);
      });
    }

    revalidatePath("/");
    revalidatePath("/sell");
    revalidatePath(`/sell/${id}`);
    revalidatePath("/admin");

    return { success: true, message: "آگهی با موفقیت حذف شد." };
  } catch (error) {
    console.error("DELETE MY CAR AD ERROR:", error);
    return { success: false, message: "حذف آگهی انجام نشد. دوباره تلاش کنید." };
  }
}