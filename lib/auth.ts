import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const secret = new TextEncoder().encode(
process.env.AUTH_SECRET || "auto-cold-secret"
);

// =========================
// PASSWORD
// =========================

export async function hashPassword(password: string) {
return bcrypt.hash(password, 12);
}

export async function verifyPassword(
password: string,
hashedPassword: string
) {
return bcrypt.compare(password, hashedPassword);
}

// =========================
// USER JWT
// =========================

export async function createToken(userId: number) {
return new SignJWT({
userId,
})
.setProtectedHeader({
alg: "HS256",
})
.setIssuedAt()
.setExpirationTime("7d")
.sign(secret);
}

// =========================
// ADMIN JWT
// =========================

export async function createAdminToken(adminId: number) {
return new SignJWT({
adminId,
role: "ADMIN",
})
.setProtectedHeader({
alg: "HS256",
})
.setIssuedAt()
.setExpirationTime("8h")
.sign(secret);
}

// =========================
// VERIFY JWT
// =========================

export async function verifyToken(token: string) {
try {
const { payload } = await jwtVerify(token, secret);
return payload;
} catch {
return null;
}
}
