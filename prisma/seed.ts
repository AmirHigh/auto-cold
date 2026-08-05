import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.car.deleteMany();

  await prisma.car.createMany({
    data: [
      {
        brand: "BMW",
        model: "M4 Competition",
        year: 2024,
        price: "$82,000",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200",
        description: "BMW M4 Competition 2024",
      },
      {
        brand: "Mercedes-Benz",
        model: "G63 AMG",
        year: 2023,
        price: "$195,000",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200",
        description: "Mercedes G63 AMG",
      },
      {
        brand: "Porsche",
        model: "911 Turbo S",
        year: 2024,
        price: "$245,000",
        image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200",
        description: "Porsche 911 Turbo S",
      },
    ],
  });

  console.log("✅ Seed completed.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });