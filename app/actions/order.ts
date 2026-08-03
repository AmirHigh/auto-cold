"use server";

import { prisma } from "@/lib/prisma";

type OrderData = {
  fullName: string;
  phone: string;
  email?: string;
  message?: string;
  carId: number;
};

export async function createOrder(data: OrderData) {
  await prisma.order.create({
    data: {
      fullName: data.fullName,
      phone: data.phone,
      email: data.email || null,
      message: data.message || null,
      carId: data.carId,
    },
  });

  return {
    success: true,
  };
}