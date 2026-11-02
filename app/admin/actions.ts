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
await prisma.$transaction(async (tx) => {
await tx.carAdImage.deleteMany({
where: { carAdId: id },
});


  await tx.carAd.delete({
    where: { id },
  });
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
