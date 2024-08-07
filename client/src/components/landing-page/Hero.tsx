import HeroSVG from "./HeroSVG";
import LandingPageNavbar from "./LandingPageNavbar";

const Hero = () => {
  return (
    <section className="h-fit lg:min-h-[90vh] w-full bg-zinc-950 text-white flex flex-col gap-0 lg:gap-14">
      <LandingPageNavbar />
      <div className="flex w-full flex-col lg:flex-row md:w-3/4 mx-auto container h-full items-center gap-10">
        <div className="flex flex-col gap-10 w-full lg:w-3/4 justify-center my-14 h-full">
          <h2 className="text-4xl md:text-6xl font-serif font-light text-center lg:text-left">
            Life happens
          </h2>
          <div className="w-fit relative m-auto lg:m-0">
            <span className="text-[3rem] lg:text-7xl 2xl:text-8xl font-serif w-fit z-[200] relative text-zinc-100 text-center text-nowrap">
              Be prepared!
            </span>
            <div className="absolute w-full scale-y-125 scale-x-105 skew-x-[7deg] rotate-[180deg] h-full z-[100] bg-yellow-500/90 top-2 rounded-sm" />
          </div>
          <p className="w-full md:w-9/12 text-lg lg:text-xl mt-6 leading-relaxed font-medium text-center lg:text-left mx-auto lg:mx-0">
            Life is unpredictable, but your finances don't
            have to be. Create your emergency fund and
            prepare for the future.
          </p>
        </div>
      </div>
      <div className="z-10  flex-1 w-full flex justify-center"></div>
      <HeroSVG />
    </section>
  );
};
export default Hero;
