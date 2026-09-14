"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// =========================
// CREATE CAR
// =========================

export async function createCar(formData: FormData) {
  const brand = String(formData.get("brand") || "");
  const model = String(formData.get("model") || "");
  const year = Number(formData.get("year"));
  const price = String(formData.get("price") || "");
  const image = String(formData.get("image") || "");
  const description = String(formData.get("description") || "");

  const images = JSON.parse(
    String(formData.get("images") || "[]")
  ) as string[];

  const car = await prisma.car.create({
    data: {
      brand,
      model,
      year,
      price,
      image,
      description,
    },
  });

  // تصاویر اضافی
  if (images.length > 0) {
    await prisma.carImage.createMany({
      data: images.map((img) => ({
        image: img,
        carId: car.id,
      })),
    });
  }

  revalidatePath("/cars");
  revalidatePath("/admin");

  redirect("/admin?success=created");
}

// =========================
// UPDATE CAR
// =========================

export async function updateCar(formData: FormData) {
  const id = Number(formData.get("id"));

  const brand = String(formData.get("brand") || "");
  const model = String(formData.get("model") || "");
  const year = Number(formData.get("year"));
  const price = String(formData.get("price") || "");
  const image = String(formData.get("image") || "");
  const description = String(formData.get("description") || "");

  const images = JSON.parse(
    String(formData.get("images") || "[]")
  ) as string[];

  // آپدیت خودرو
  await prisma.car.update({
    where: {
      id,
    },
    data: {
      brand,
      model,
      year,
      price,
      image,
      description,
    },
  });

  // حذف تصاویر قبلی
  await prisma.carImage.deleteMany({
    where: {
      carId: id,
    },
  });

  // ثبت تصاویر جدید
  if (images.length > 0) {
    await prisma.carImage.createMany({
      data: images.map((img) => ({
        image: img,
        carId: id,
      })),
    });
  }

  revalidatePath("/cars");
  revalidatePath("/admin");

  redirect("/admin?success=updated");
}

// =========================
// DELETE CAR
// =========================

export async function deleteCar(id: number) {
  // حذف سفارش‌های مربوط به خودرو
  await prisma.order.deleteMany({
    where: {
      carId: id,
    },
  });

  // حذف تصاویر مربوط به خودرو
  await prisma.carImage.deleteMany({
    where: {
      carId: id,
    },
  });

  // حذف خود خودرو
  await prisma.car.delete({
    where: {
      id,
    },
  });

  revalidatePath("/cars");
  revalidatePath("/admin");
}