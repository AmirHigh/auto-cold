"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

const COOKIE_NAME = "auto_cold_session";

async function getCurrentUserId(): Promise<number | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const payload = await verifyToken(token);

  if (
    !payload ||
    typeof payload.userId !== "number" ||
    !Number.isInteger(payload.userId)
  ) {
    return null;
  }

  return payload.userId;
}

export async function getFavoriteStatus(carId: number) {
  if (!Number.isInteger(carId) || carId <= 0) {
    return {
      ok: false,
      isFavorite: false,
      message: "شناسه خودرو معتبر نیست.",
    };
  }

  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      ok: false,
      isFavorite: false,
      message: "برای استفاده از علاقه‌مندی‌ها وارد حساب خود شوید.",
    };
  }

  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_carId: {
        userId,
        carId,
      },
    },
    select: {
      id: true,
    },
  });

  return {
    ok: true,
    isFavorite: Boolean(favorite),
  };
}

export async function toggleFavorite(carId: number) {
  if (!Number.isInteger(carId) || carId <= 0) {
    return {
      ok: false,
      isFavorite: false,
      message: "شناسه خودرو معتبر نیست.",
    };
  }

  const userId = await getCurrentUserId();

  if (!userId) {
    return {
      ok: false,
      isFavorite: false,
      message: "ابتدا وارد حساب کاربری خود شوید.",
    };
  }

  const car = await prisma.car.findUnique({
    where: {
      id: carId,
    },
    select: {
      id: true,
    },
  });

  if (!car) {
    return {
      ok: false,
      isFavorite: false,
      message: "خودروی موردنظر پیدا نشد.",
    };
  }

  const existingFavorite = await prisma.favorite.findUnique({
    where: {
      userId_carId: {
        userId,
        carId,
      },
    },
    select: {
      id: true,
    },
  });

  let isFavorite: boolean;

  if (existingFavorite) {
    await prisma.favorite.delete({
      where: {
        userId_carId: {
          userId,
          carId,
        },
      },
    });

    isFavorite = false;
  } else {
    await prisma.favorite.create({
      data: {
        userId,
        carId,
      },
    });

    isFavorite = true;
  }

  revalidatePath("/favorites");
  revalidatePath("/cars");

  return {
    ok: true,
    isFavorite,
    message: isFavorite
      ? "خودرو به علاقه‌مندی‌ها اضافه شد."
      : "خودرو از علاقه‌مندی‌ها حذف شد.",
  };
}