import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddCarForm from "@/components/AddCarForm";
import { updateCar } from "@/app/admin/add-car/actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCarPage({ params }: Props) {
  const { id } = await params;

  const car = await prisma.car.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!car) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-6">
      <div className="max-w-3xl mx-auto bg-slate-900 rounded-3xl p-10 border border-blue-500/20">
        <h1 className="text-4xl font-bold text-blue-400 mb-10 text-center">
          ویرایش خودرو
        </h1>

        <AddCarForm
          action={updateCar}
          car={car}
        />
      </div>
    </main>
  );
}