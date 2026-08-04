import {
  ShieldCheck,
  Truck,
  BadgeDollarSign,
  Gem,
} from "lucide-react";

export default function WhyUs() {
  const items = [
    {
      icon: ShieldCheck,
      title: "ضمانت اصالت",
      text: "تمام خودروهای ما با تضمین اصالت و مدارک معتبر عرضه می‌شوند.",
    },
    {
      icon: Truck,
      title: "تحویل سریع",
      text: "تحویل خودرو در سریع‌ترین زمان ممکن در سراسر کشور.",
    },
    {
      icon: BadgeDollarSign,
      title: "بهترین قیمت",
      text: "رقابتی‌ترین قیمت بازار همراه با شرایط پرداخت متنوع.",
    },
    {
      icon: Gem,
      title: "خودروهای خاص",
      text: "مجموعه‌ای از لوکس‌ترین و کمیاب‌ترین خودروهای وارداتی.",
    },
  ];

  return (
    <section className="py-24 bg-slate-900">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-black">
            چرا AUTO COLD؟
          </h2>

          <p className="text-gray-400 mt-6 text-xl">
            تجربه‌ای متفاوت در خرید خودروهای لوکس
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {items.map((item) => {
            const Icon = item.icon;

            return (

              <div
                key={item.title}
                className="rounded-3xl bg-slate-950 border border-white/10 p-8 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(59,130,246,.25)]"
              >

                <div className="w-20 h-20 rounded-full bg-blue-600/20 flex items-center justify-center mb-6">

                  <Icon
                    size={36}
                    className="text-blue-400"
                  />

                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-8">
                  {item.text}
                </p>

              </div>

            );
          })}

        </div>

      </div>

    </section>
  );
}