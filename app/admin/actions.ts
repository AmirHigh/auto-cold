"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  const payload = await verifyToken(token);

  if (
    !payload ||
    payload.role !== "ADMIN" ||
    typeof payload.adminId !== "number"
  ) {
    redirect("/admin/login");
  }
}

function getText(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export async function createCar(formData: FormData) {
  await requireAdmin();

  const brand = getText(formData, "brand");
  const model = getText(formData, "model");
  const year = Number(formData.get("year"));
  const price = getText(formData, "price");

  const description = getText(formData, "description");

  const mileage = getText(formData, "mileage");
  const color = getText(formData, "color");

  const engineType = getText(formData, "engineType");
  const engineVolume = getText(formData, "engineVolume");
  const cylinders = getText(formData, "cylinders");
  const horsepower = getText(formData, "horsepower");
  const transmission = getText(formData, "transmission");
  const fuelType = getText(formData, "fuelType");

  const bodyCondition = getText(formData, "bodyCondition");
  const technicalCondition = getText(formData, "technicalCondition");
  const paintCondition = getText(formData, "paintCondition");
  const tireCondition = getText(formData, "tireCondition");

  const features = getText(formData, "features");

  let images: string[] = [];

  try {
    const rawImages = formData.get("images");

    if (typeof rawImages === "string") {
      const parsed = JSON.parse(rawImages);

      if (Array.isArray(parsed)) {
        images = parsed.filter(
          (image): image is string =>
            typeof image === "string" &&
            image.startsWith("https://")
        );
      }
    }
  } catch {
    throw new Error("اطلاعات تصاویر معتبر نیست.");
  }

  if (!brand || !model || !price) {
    throw new Error("لطفاً اطلاعات خودرو را کامل وارد کنید.");
  }

  if (!Number.isInteger(year) || year < 1900 || year > 2100) {
    throw new Error("سال ساخت معتبر نیست.");
  }

  if (images.length === 0) {
    throw new Error("لطفاً حداقل یک تصویر برای خودرو آپلود کنید.");
  }

  if (images.length > 10) {
    throw new Error("حداکثر ۱۰ تصویر مجاز است.");
  }

  await prisma.car.create({
    data: {
      brand,
      model,
      year,
      price,
      image: images[0],

      description: description || null,

      mileage: mileage || null,
      color: color || null,

      engineType: engineType || null,
      engineVolume: engineVolume || null,
      cylinders: cylinders || null,
      horsepower: horsepower || null,
      transmission: transmission || null,
      fuelType: fuelType || null,

      bodyCondition: bodyCondition || null,
      technicalCondition: technicalCondition || null,
      paintCondition: paintCondition || null,
      tireCondition: tireCondition || null,

      features: features || null,

      status: "AVAILABLE",

      images: {
        create: images.map((image) => ({
          image,
        })),
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/cars");
  revalidatePath("/admin");
  revalidatePath("/admin/cars");

  redirect("/admin");
}

export async function approveCarAd(id: number) {
  await requireAdmin();

  await prisma.carAd.update({
    where: { id },
    data: { status: "APPROVED" },
  });

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/sell");
}

export async function rejectCarAd(id: number) {
  await requireAdmin();

  await prisma.carAd.update({
    where: { id },
    data: { status: "REJECTED" },
  });

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/sell");
}

export async function deleteCarAd(id: number) {
  await requireAdmin();

  try {
    await prisma.carAdImage.deleteMany({
      where: { carAdId: id },
    });

    await prisma.carAd.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/");
    revalidatePath("/sell");

    return { success: true };
  } catch (error) {
    console.error("DELETE CAR AD ERROR:", error);

    return {
      success: false,
      message: "خطا در حذف آگهی",
    };
  }
}

export async function deleteCar(id: number) {
  await requireAdmin();

  try {
    await prisma.car.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/");
    revalidatePath("/cars");

    return { success: true };
  } catch (error) {
    console.error("DELETE CAR ERROR:", error);

    return {
      success: false,
      message: "خطا در حذف خودرو",
    };
  }
}

export async function deleteOrder(id: number) {
  await requireAdmin();

  try {
    await prisma.order.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/orders");

    return { success: true };
  } catch (error) {
    console.error("DELETE ORDER ERROR:", error);

    return {
      success: false,
      message: "خطا در حذف سفارش",
    };
  }
}

export async function updateOrderStatus(
  orderId: number,
  status: string
) {
  await requireAdmin();

  const allowedStatuses = [
    "NEW",
    "PENDING",
    "CONFIRMED",
    "COMPLETED",
    "CANCELLED",
  ];

  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw new Error("شناسه سفارش معتبر نیست.");
  }

  if (!allowedStatuses.includes(status)) {
    throw new Error("وضعیت سفارش معتبر نیست.");
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/orders");
}