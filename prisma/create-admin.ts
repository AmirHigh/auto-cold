import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  const username = "admin";
  const password = "Admin@12345";

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.upsert({
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

  console.log("Admin created/updated:", admin.username);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });