import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import CreateCarAdForm from "@/components/CreateCarAdForm";

export default async function CreateCarAdPage() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("auto_cold_session")?.value;

  if (!token) {
    redirect("/login");
  }

  const payload = await verifyToken(token);

  if (!payload?.userId) {
    redirect("/login");
  }

  const userId = Number(payload.userId);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 py-32"
    >
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-10">

          <p className="text-blue-400 font-bold mb-3">
            AUTO COLD
          </p>

          <h1 className="text-4xl font-bold mb-4">
            ثبت آگهی فروش خودرو
          </h1>

          <p className="text-gray-400">
            مشخصات خودروی خود را وارد کنید.
            آگهی پس از بررسی مدیر منتشر خواهد شد.
          </p>

        </div>

        <CreateCarAdForm
          user={{
            name: user.name,
            phone: user.phone || "",
            city: user.city || "",
          }}
        />

      </div>
    </main>
  );
}