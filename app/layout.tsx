
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { getCurrentUser } from "@/lib/current-user";

export const metadata: Metadata = {
  title: "AUTO COLD | Luxury Car Gallery",
  description:
    "AUTO COLD - گالری خودروهای لوکس و وارداتی، خرید و فروش خودروهای خاص",
  applicationName: "AUTO COLD",
  openGraph: {
    title: "AUTO COLD | Luxury Car Gallery",
    description:
      "گالری خودروهای لوکس و وارداتی؛ مشاهده خودروها و ثبت سفارش",
    siteName: "AUTO COLD",
    locale: "fa_IR",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen overflow-x-hidden bg-slate-950 text-white antialiased">
        <Header user={user} />

        {/* فاصله برای هدر ثابت */}
        <div className="h-[72px] sm:h-[80px] md:h-[88px]" />

        {/* محتوای صفحات */}
        <main>{children}</main>
      </body>
    </html>
  );
}

