"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateCar(id: number, formData: FormData) {
  const brand = formData.get("brand") as string;
  const model = formData.get("model") as string;
  const year = Number(formData.get("year"));
  const price = formData.get("price") as string;
  const image = formData.get("image") as string;
  const description = formData.get("description") as string;

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

  revalidatePath("/cars");
  revalidatePath("/admin");

  redirect("/admin");
}