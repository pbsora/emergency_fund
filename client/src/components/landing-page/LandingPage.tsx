import About from "./About";
import Action from "./Action";
import Footer from "./Footer";
import Hero from "./Hero";
import Perks from "./Perks";

const LandingPage = () => {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden bg-slate-50">
      <Hero />
      <About />
      <Perks />
      <hr className="border-b border-zinc-200 w-11/12 lg:w-10/12 m-auto" />
      <Action />
      <Footer />
    </main>
  );
};
export default LandingPage;
