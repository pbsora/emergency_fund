import About from "./About";
import Action from "./Action";
import Hero from "./Hero";
import Perks from "./Perks";

const LandingPage = () => {
  return (
    <>
      <Hero />
      <About />
      <Perks />
      <hr className="border-b border-zinc-200 w-11/12 lg:w-10/12 m-auto" />
      <Action />
    </>
  );
};
export default LandingPage;
