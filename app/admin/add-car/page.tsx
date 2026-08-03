import { createCar } from "./actions";
import AddCarForm from "@/components/AddCarForm";

export default function AddCarPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-6">
      <div className="max-w-3xl mx-auto bg-slate-900 rounded-3xl p-10 border border-blue-500/20">
        <h1 className="text-4xl font-bold text-blue-400 mb-10 text-center">
          افزودن خودرو جدید
        </h1>

        <AddCarForm action={createCar} />
      </div>
    </main>
  );
}