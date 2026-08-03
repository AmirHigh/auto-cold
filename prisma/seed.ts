import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.car.createMany({
    data: [
      {
        brand: "BMW",
        model: "M4 Competition",
        year: 2024,
        price: "$82,000",
        image: "/cars/bmw-m4.jpg",
        description:
          "The BMW M4 Competition combines luxury, performance and advanced technology with an aggressive design.",
      },
      {
        brand: "Mercedes-Benz",
        model: "G63 AMG",
        year: 2023,
        price: "$195,000",
        image: "/cars/g63.jpg",
        description:
          "Luxury SUV with exceptional off-road capability and premium interior.",
      },
      {
        brand: "Porsche",
        model: "911 Turbo S",
        year: 2024,
        price: "$245,000",
        image: "/cars/porsche911.jpg",
        description:
          "One of the fastest sports cars in the world with everyday usability.",
      },
    ],
  });

  console.log("✅ Cars added successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });