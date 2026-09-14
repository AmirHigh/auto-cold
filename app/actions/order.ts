"use server";

import { prisma } from "@/lib/prisma";

type CreateOrderInput = {
  fullName: string;
  phone: string;
  email?: string;
  message?: string;
  carId: number;
};

export async function createOrder(data: CreateOrderInput) {
  const fullName = data.fullName.trim();
  const phone = data.phone.trim();
  const email = data.email?.trim() || "";
  const message = data.message?.trim() || "";
  const carId = Number(data.carId);

  if (!fullName || !phone || !carId) {
    throw new Error("اطلاعات سفارش کامل نیست.");
  }

  // مطمئن شو خودرو هنوز وجود دارد
  const car = await prisma.car.findUnique({
    where: {
      id: carId,
    },
  });

  if (!car) {
    throw new Error("این خودرو پیدا نشد.");
  }

  // ثبت سفارش
  const order = await prisma.order.create({
    data: {
      fullName,
      phone,
      email,
      message,
      carId,
      status: "NEW",
    },
  });

  return {
    success: true,
    orderId: order.id,
  };
}