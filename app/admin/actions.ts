"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/* =========================
   CREATE CAR
========================= */

export async function createCar(formData: FormData) {
  const brand = String(formData.get("brand") || "").trim();
  const model = String(formData.get("model") || "").trim();
  const year = Number(formData.get("year"));
  const price = String(formData.get("price") || "").trim();
  const image = String(formData.get("image") || "").trim();
  const description = String(
    formData.get("description") || ""
  ).trim();

  let images: string[] = [];

  try {
    images = JSON.parse(
      String(formData.get("images") || "[]")
    ) as string[];
  } catch {
    images = [];
  }

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

  if (images.length > 0) {
    await prisma.carImage.createMany({
      data: images.map((img) => ({
        image: img,
        carId: car.id,
      })),
    });
  }

  revalidatePath("/");
  revalidatePath("/cars");
  revalidatePath("/admin");

  redirect("/admin?success=created");
}

/* =========================
   UPDATE CAR
========================= */

export async function updateCar(formData: FormData) {
  const id = Number(formData.get("id"));

  const brand = String(formData.get("brand") || "").trim();
  const model = String(formData.get("model") || "").trim();
  const year = Number(formData.get("year"));
  const price = String(formData.get("price") || "").trim();
  const image = String(formData.get("image") || "").trim();
  const description = String(
    formData.get("description") || ""
  ).trim();

  let images: string[] = [];

  try {
    images = JSON.parse(
      String(formData.get("images") || "[]")
    ) as string[];
  } catch {
    images = [];
  }

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

  await prisma.carImage.deleteMany({
    where: {
      carId: id,
    },
  });

  if (images.length > 0) {
    await prisma.carImage.createMany({
      data: images.map((img) => ({
        image: img,
        carId: id,
      })),
    });
  }

  revalidatePath("/");
  revalidatePath("/cars");
  revalidatePath(`/cars/${id}`);
  revalidatePath("/admin");

  redirect("/admin?success=updated");
}

/* =========================
   DELETE CAR
========================= */

export async function deleteCar(id: number) {
  // سفارش‌های مربوط به خودرو
  await prisma.order.deleteMany({
    where: {
      carId: id,
    },
  });

  // تصاویر خودرو
  await prisma.carImage.deleteMany({
    where: {
      carId: id,
    },
  });

  // خود خودرو
  await prisma.car.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
  revalidatePath("/cars");
  revalidatePath("/admin");
}

/* =========================
   UPDATE ORDER STATUS
========================= */

export async function updateOrderStatus(
  orderId: number,
  status: string
) {
  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
  });

  revalidatePath("/admin");
}

/* =========================
   DELETE ORDER
========================= */

export async function deleteOrder(id: number) {
  await prisma.order.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin");
}