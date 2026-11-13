import {
  Phone,
    Camera,
  MessageCircle,
  Send,
  ArrowUpLeft,
} from "lucide-react";

const phoneNumbers = [
  { number: "09010232269", name: "یوسفی" },
  { number: "09307476863", name: "میری" },
  { number: "09939296802", name: "ناصری" },
];

const socials = [
  {
    title: "اینستاگرام",
    username: "@autocold.ir",
    href: "https://instagram.com/autocold.ir",
    icon:   Camera,
    description: "ما را در اینستاگرام دنبال کنید",
  },
  {
    title: "واتساپ",
    username: "AUTO COLD",
    href: "https://wa.me/989965877644",
    icon: MessageCircle,
    description: "ارسال پیام مستقیم در واتساپ",
  },
  {
    title: "تلگرام",
    username: "@autocold_ir",
    href: "https://t.me/autocold_ir",
    icon: Send,
    description: "ارتباط با ما در تلگرام",
  },
];

export default function ContactPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-950 px-5 py-16 text-white sm:px-10"
    >
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-4 text-sm font-semibold tracking-[0.3em] text-blue-400">
            AUTO COLD
          </p>

          <h1 className="text-4xl font-black sm:text-5xl">
            تماس با ما
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-slate-400 sm:text-base">
            برای دریافت مشاوره، اطلاع از شرایط خرید و فروش خودرو
            و ثبت سفارش، از طریق راه‌های ارتباطی زیر با ما در تماس باشید.
          </p>

          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-blue-500" />
        </div>

        {/* Phone Numbers */}
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <Phone className="text-blue-400" size={25} />
            <h2 className="text-2xl font-bold">شماره‌های تماس</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {phoneNumbers.map((contact) => (
              <a
                key={contact.number}
                href={`tel:${contact.number}`}
                className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-slate-900"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                    <Phone size={23} />
                  </div>

                  <span className="rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-bold text-blue-400">
                    {contact.name}
                  </span>
                </div>

                <p
                  dir="ltr"
                  className="text-center text-xl font-bold tracking-wide text-white transition-colors group-hover:text-blue-400"
                >
                  {contact.number}
                </p>

                <p className="mt-3 text-center text-xs text-slate-500">
                  برای تماس کلیک کنید
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Social Media */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <MessageCircle className="text-blue-400" size={25} />
            <h2 className="text-2xl font-bold">شبکه‌های اجتماعی</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {socials.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.title}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-slate-900"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                      <Icon size={25} />
                    </div>

                    <ArrowUpLeft
                      size={20}
                      className="text-slate-600 transition-colors group-hover:text-blue-400"
                    />
                  </div>

                  <h3 className="text-xl font-bold">
                    {social.title}
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-blue-400">
                    {social.username}
                  </p>

                  <p className="mt-3 text-xs text-slate-500">
                    {social.description}
                  </p>
                </a>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <div className="mt-16 border-t border-slate-800 pt-8 text-center">
          <h3 className="text-2xl font-black tracking-widest text-blue-400">
            AUTO COLD
          </h3>

          <p className="mt-3 text-sm text-slate-500">
            Luxury Car Gallery
          </p>

          <p className="mt-2 text-xs text-slate-600">
            تجربه‌ای متفاوت از خرید و فروش خودرو
          </p>
        </div>

      </div>
    </main>
  );
}