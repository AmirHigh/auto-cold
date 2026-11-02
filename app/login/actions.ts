"use server";

import { prisma } from "@/lib/prisma";
import { createToken, verifyPassword } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginUser(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") ?? "");

  // اعتبارسنجی ایمیل و رمز عبور
  if (
    !email ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !password ||
    password.length > 128
  ) {
    redirect("/login?error=invalid");
  }

  // دریافت اطلاعات حساب کاربری
  let user;

  try {
    user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
        role: true,
      },
    });
  } catch (error) {
    console.error("AUTO COLD database error:", error);
    redirect("/login?error=server");
  }

  if (!user) {
    redirect("/login?error=credentials");
  }

  // بررسی رمز عبور
  let validPassword: boolean;

  try {
    validPassword = await verifyPassword(
      password,
      user.password
    );
  } catch (error) {
    console.error(
      "AUTO COLD password verification error:",
      error
    );

    redirect("/login?error=server");
  }

  if (!validPassword) {
    redirect("/login?error=credentials");
  }

  // ساخت توکن نشست
  let token: string;

  try {
    token = await createToken(user.id);
  } catch (error) {
    console.error(
      "AUTO COLD token creation error:",
      error
    );

    redirect("/login?error=server");
  }

  // ذخیره نشست در کوکی امن
  const cookieStore = await cookies();

  cookieStore.set("auto_cold_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  // هدایت بر اساس نقش حساب
  if (user.role === "ADMIN") {
    redirect("/admin");
  }

  redirect("/");
}