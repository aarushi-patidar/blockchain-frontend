
import Spline from "@splinetool/react-spline/next";
import {GlassSurface} from "@/components"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden w-full min-h-screen bg-linear-to-tr from-blue-200 to-yellow-300 group">
      <div className="absolute inset-0 z-10 transition-all duration-300 group-hover:brightness-125">
        <Spline scene="https://prod.spline.design/KP2uUWsBiBpantpl/scene.splinecode" />
      </div>

      <img src="gradient.png" alt=""  className="absolute top-0 z-11 right-0 scale-50 translate-x-[25%] -translate-y-[30%]"/>

        {/* Left side - Title and Subtitle */}
          <div className="flex absolute z-12 bottom-10 left-10 flex-col justify-center gap-6 max-w-2xl">
            <h1 className="font-avant text-7xl italic text-white leading-tight">
              VoltageChain
            </h1>
            <p className="font-avant text-3xl italic text-white leading-relaxed">
              Giving Automobile Batteries a Second Life
            </p>
          </div>

          {/* Right side - Description */}
          <div className="max-w-xs absolute bottom-20 right-10 z-12 text-right">
            <p className="text-white text-lg font leading-relaxed font-light">
              Combining AI diagnostics to predict voltage, Blockchain to prove
              ownership, Circular Marketplace to ensure no good battery ever
              goes to waste.
            </p>
          </div>
    </section>
  );
}
