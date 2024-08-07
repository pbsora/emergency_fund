import Link from "next/link";

const LandingPageNavbar = () => {
  return (
    <nav className="w-full h-20 flex justify-between px-3 md:px-20 items-center">
      <div>
        <img src="/logo.png" alt="logo" className="w-28" />
      </div>
      <div className="flex gap-5">
        <Link
          href={"/login"}
          className="bg-transparent py-1 px-3 flex items-center rounded-lg text-white border border-white hover:bg-zinc-600 duration-200"
        >
          Log in
        </Link>
        <Link
          href={"register"}
          className="bg-yellow-500/90 text-white py-1 px-3 flex items-center rounded-lg hover:bg-yellow-600 duration-200"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};
export default LandingPageNavbar;
