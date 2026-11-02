import "dotenv/config";

import { prisma } from "../lib/prisma";
import { hashPassword } from "../lib/auth";

async function main() {
  const email = "teamautocold@gmail.com";
  const password = process.env.ADMIN_PASSWORD;

  if (!password || password.length < 12) {
    throw new Error(
      "ADMIN_PASSWORD must be set and contain at least 12 characters."
    );
  }

  const hashedPassword = await hashPassword(password);

  const admin = await prisma.user.upsert({
    where: { email },

    update: {
      role: "ADMIN",
      password: hashedPassword,
      name: "AUTO COLD Admin",
    },

    create: {
      name: "AUTO COLD Admin",
      email,
      password: hashedPassword,
      role: "ADMIN",
    },

    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  console.log("Admin account is ready:", admin);
}

main()
  .catch((error) => {
    console.error("Failed to create admin:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });