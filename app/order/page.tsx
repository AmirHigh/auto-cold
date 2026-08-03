import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import OrderForm from "@/components/OrderForm";

type Props = {
  searchParams: Promise<{
    carId?: string;
  }>;
};

export default async function OrderPage({
  searchParams,
}: Props) {
  const { carId } = await searchParams;

  if (!carId) {
    notFound();
  }

  const car = await prisma.car.findUnique({
    where: {
      id: Number(carId),
    },
  });

  if (!car) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-6">
      <div className="max-w-3xl mx-auto bg-slate-900 rounded-3xl p-10 border border-blue-500/20">

        <h1 className="text-4xl font-bold text-blue-400 mb-8 text-center">
          ثبت سفارش خودرو
        </h1>

        <OrderForm
          car={`${car.brand} ${car.model}`}
          carId={car.id}
        />

      </div>
    </main>
  );
}