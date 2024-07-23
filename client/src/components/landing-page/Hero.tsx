import LandingPageNavbar from "./LandingPageNavbar";
import { FaCheckCircle } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="min-h-screen w-full bg-zinc-950 text-white flex flex-col gap-14">
      <LandingPageNavbar />
      <div className="flex w-3/4 mx-auto container h-full">
        <div className="flex flex-col gap-5 w-3/4 justify-center mt-14 h-full">
          <h2 className="text-6xl font-serif font-light">
            Life happens
          </h2>
          <div className="w-fit relative">
            <span className="text-8xl font-serif w-fit z-[200] relative text-zinc-100">
              Be prepared!
            </span>
            <div className="absolute w-full scale-y-125 scale-x-105 skew-x-[7deg] rotate-[180deg] h-full z-[100] bg-yellow-500/90 top-2" />
          </div>
          <p className="w-9/12 text-xl mt-6 leading-relaxed">
            Life is unpredictable, but your finances don't
            have to be. Create your emergency fund and
            prepare for the future.
          </p>
          <div className="flex items-center gap-10 mt-10">
            <div className="flex gap-3 items-center text-lg">
              <FaCheckCircle className="text-green-500" />
              <span>100% free</span>
            </div>
            <div className="flex gap-3 items-center text-lg">
              <FaCheckCircle className="text-green-500" />
              <span>Easy to use</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
