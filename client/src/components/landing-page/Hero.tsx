import LandingPageNavbar from "./LandingPageNavbar";

const Hero = () => {
  return (
    <section className="min-h-screen w-screen bg-zinc-950 text-white flex flex-col gap-14">
      <LandingPageNavbar />
      <div className="flex w-full container">
        <div className="flex flex-col gap-5">
          <h2 className="text-6xl">Life happens</h2>
          <h1 className="text-7xl">Be prepared!</h1>
        </div>
      </div>
    </section>
  );
};
export default Hero;
