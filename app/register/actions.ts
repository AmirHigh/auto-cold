"use server";

import { prisma } from "@/lib/prisma";
import {
  hashPassword,
  createToken,
} from "@/lib/auth";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  // دریافت اطلاعات فرم
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const phone = String(formData.get("phone") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  // اعتبارسنجی اطلاعات
  if (!name || name.length < 3 || name.length > 100) {
    redirect("/register?error=invalid_name");
  }

  if (
    !email ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    redirect("/register?error=invalid_email");
  }

  if (password.length < 8 || password.length > 128) {
    redirect("/register?error=invalid_password");
  }

  if (phone.length > 30 || city.length > 100) {
    redirect("/register?error=invalid_details");
  }

  // بررسی تکراری نبودن ایمیل
  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUser) {
    redirect("/register?error=email_exists");
  }

  // هش کردن رمز عبور
  const hashedPassword = await hashPassword(password);

  // ایجاد حساب کاربری
  let user;

  try {
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone: phone || null,
        city: city || null,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  } catch (error) {
    // مدیریت ثبت هم‌زمان ایمیل تکراری
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      redirect("/register?error=email_exists");
    }

    console.error("AUTO COLD registration error:", error);
    redirect("/register?error=server");
  }

  // ساخت توکن ورود
  const token = await createToken(user.id);

  // ذخیره امن کوکی ورود
  const cookieStore = await cookies();

  cookieStore.set("auto_cold_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  // انتقال کاربر به صفحه اصلی
  redirect("/");
}