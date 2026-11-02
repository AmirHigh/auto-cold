import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get(
    "auto_cold_session"
  )?.value;

  if (!token) {
    return null;
  }

  const payload = await verifyToken(token);

  if (!payload?.userId) {
    return null;
  }

  const userId = Number(payload.userId);

  if (!Number.isInteger(userId)) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      city: true,
      createdAt: true,
    },
  });

  return user;
}