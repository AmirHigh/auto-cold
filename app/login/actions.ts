"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createToken } from "@/lib/auth";

export async function login(formData: FormData) {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  if (!username || !password) {
    redirect("/login?error=missing");
  }

  const user = await prisma.admin.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    redirect("/login?error=invalid");
  }

  const isValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isValid) {
    redirect("/login?error=invalid");
  }

  // ساخت توکن ورود
  const token = await createToken(user.id);

  // ذخیره توکن در Cookie
  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 روز
  });

  // انتقال به پنل مدیریت
  redirect("/admin");
}