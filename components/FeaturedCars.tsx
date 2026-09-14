import Image from "next/image";
import Link from "next/link";

type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: string;
  image: string | null;
  description?: string | null;
};

type Props = {
  cars: Car[];
};

export default function FeaturedCars({ cars }: Props) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            خودروهای ویژه
          </h2>

          <p className="text-gray-400">
            بهترین خودروهای موجود در AUTO COLD
          </p>
        </div>

        {/* Cars */}
        {cars.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              هنوز خودرویی ثبت نشده است.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {cars.map((car) => (
              <div
                key={car.id}
                className="bg-slate-900 rounded-3xl overflow-hidden border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 shadow-xl"
              >

                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-slate-800">

                  {car.image ? (
                    <Image
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-500">
                        تصویر موجود نیست
                      </span>
                    </div>
                  )}

                </div>

                {/* Info */}
                <div className="p-6">

                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-white">
                      {car.brand} {car.model}
                    </h3>

                    <span className="text-blue-400 text-sm">
                      {car.year}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-6">

                    <span className="text-gray-400">
                      قیمت
                    </span>

                    <span className="text-xl font-bold text-blue-400">
                      {car.price}
                    </span>

                  </div>

                  {/* Details button */}
                  <Link
                    href={`/cars/${car.id}`}
                    className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition"
                  >
                    مشاهده جزئیات
                  </Link>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}