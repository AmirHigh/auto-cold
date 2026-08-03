"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createCar(formData: FormData) {
  const brand = formData.get("brand") as string;
  const model = formData.get("model") as string;
  const year = Number(formData.get("year"));
  const price = formData.get("price") as string;
  const image = formData.get("image") as string;
  const description = formData.get("description") as string;

  const images = JSON.parse(
    (formData.get("images") as string) || "[]"
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

export async function updateCar(formData: FormData) {
  const id = Number(formData.get("id"));

  const brand = formData.get("brand") as string;
  const model = formData.get("model") as string;
  const year = Number(formData.get("year"));
  const price = formData.get("price") as string;
  const image = formData.get("image") as string;
  const description = formData.get("description") as string;

  const images = JSON.parse(
    (formData.get("images") as string) || "[]"
  ) as string[];

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

  revalidatePath("/cars");
  revalidatePath("/admin");

  redirect("/admin?success=updated");
}

export async function deleteCar(id: number) {
  await prisma.order.deleteMany({
    where: {
      carId: id,
    },
  });

  await prisma.carImage.deleteMany({
    where: {
      carId: id,
    },
  });

  await prisma.car.delete({
    where: {
      id,
    },
  });

  revalidatePath("/cars");
  revalidatePath("/admin");
}