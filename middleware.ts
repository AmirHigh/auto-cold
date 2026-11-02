import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
const pathname = req.nextUrl.pathname;

// اجازه نمایش صفحه ورود ادمین
if (pathname === "/admin/login") {
return NextResponse.next();
}

const token = req.cookies.get("session")?.value;

if (!token) {
return NextResponse.redirect(
new URL("/admin/login", req.url)
);
}

const payload = await verifyToken(token);

if (
!payload ||
payload.role !== "ADMIN" ||
typeof payload.adminId !== "number"
) {
const response = NextResponse.redirect(
new URL("/admin/login", req.url)
);


response.cookies.delete("session");

return response;


}

return NextResponse.next();
}

export const config = {
matcher: ["/admin/:path*"],
};
