"use client";

import { Car } from "lucide-react";
import FadeIn from "./FadeIn";
import CountUp from "react-countup";

type StatsProps = {
availableCars: number;
};

export default function Stats({ availableCars }: StatsProps) {
return ( <section
   dir="rtl"
   className="bg-slate-950 py-12 sm:py-16 md:py-20"
 > <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <FadeIn> <div className="mx-auto max-w-sm rounded-2xl border border-white/10 bg-slate-900 p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-[0_0_35px_rgba(59,130,246,.2)] sm:rounded-3xl sm:p-8">
{/* Icon */} <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/20 sm:h-20 sm:w-20"> <Car
             size={34}
             className="text-blue-400 sm:h-10 sm:w-10"
           /> </div>

```
        {/* Number */}
        <h2 className="text-4xl font-black leading-none text-blue-400 sm:text-5xl">
          <CountUp
            key={availableCars}
            start={0}
            end={availableCars}
            duration={1.5}
            decimals={0}
            separator=","
          />
        </h2>

        {/* Title */}
        <p className="mt-4 text-base font-bold text-white sm:text-lg">
          خودروهای موجود
        </p>

        <p className="mt-2 text-sm text-gray-400">
          خودروهای آماده فروش در گالری AUTO COLD
        </p>
      </div>
    </FadeIn>
  </div>
</section>


);
}
