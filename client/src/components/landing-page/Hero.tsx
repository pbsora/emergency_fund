import HeroSVG from "./HeroSVG";
import LandingPageNavbar from "./LandingPageNavbar";
import { FaCheckCircle } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="min-h-screen w-full bg-zinc-950 text-white flex flex-col gap-0 lg:gap-14 relative">
      <LandingPageNavbar />
      <div className="flex w-full flex-col lg:flex-row md:w-3/4 mx-auto container h-full items-center gap-10">
        <div className="flex flex-col gap-5 w-full md:w-3/4 justify-center mt-14 h-full ">
          <h2 className="text-4xl md:text-6xl font-serif font-light">
            Life happens
          </h2>
          <div className="w-fit relative">
            <span className="text-[3.5rem] md:text-8xl font-serif w-fit z-[200] relative text-zinc-100">
              Be prepared!
            </span>
            <div className="absolute w-full scale-y-125 scale-x-105 skew-x-[7deg] rotate-[180deg] h-full z-[100] bg-yellow-500/90 top-2" />
          </div>
          <p className="w-full md:w-9/12 lg:text-xl mt-6 leading-relaxed">
            Life is unpredictable, but your finances don't
            have to be. Create your emergency fund and
            prepare for the future.
          </p>
        </div>
        <div className="z-10 relative flex-1 w-full">
          <HeroSVG />
        </div>
      </div>
    </section>
  );
};
export default Hero;
