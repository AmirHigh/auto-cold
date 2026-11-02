"use server";

import { prisma } from "@/lib/prisma";
import {
createAdminToken,
verifyPassword,
} from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAdmin(formData: FormData) {
const username = String(formData.get("username") ?? "").trim();
const password = String(formData.get("password") ?? "");

if (!username || !password) {
redirect("/admin/login?error=credentials");
}

const admin = await prisma.admin.findUnique({
where: { username },
select: {
id: true,
password: true,
},
});

if (!admin) {
redirect("/admin/login?error=credentials");
}

const passwordIsValid = await verifyPassword(
password,
admin.password
);

if (!passwordIsValid) {
redirect("/admin/login?error=credentials");
}

const token = await createAdminToken(admin.id);
const cookieStore = await cookies();

cookieStore.set("session", token, {
httpOnly: true,
secure: process.env.NODE_ENV === "production",
sameSite: "lax",
path: "/",
maxAge: 60 * 60 * 8,
});

redirect("/admin");
}
