import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const username = "admin";
  const plainPassword = "Admin@12345";

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await prisma.admin.upsert({
    where: {
      username,
    },
    update: {
      password: hashedPassword,
    },
    create: {
      username,
      password: hashedPassword,
    },
  });

  console.log("=================================");
  console.log("Admin created successfully");
  console.log("Username:", username);
  console.log("Password:", plainPassword);
  console.log("=================================");
}

main()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });