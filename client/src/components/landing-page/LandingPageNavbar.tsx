import Link from "next/link";

const LandingPageNavbar = () => {
  return (
    <nav className="w-full h-20 flex justify-between px-3 md:px-20 items-center">
      <div>
        <img src="/logo.png" alt="logo" className="w-36" />
      </div>
      <div className="flex gap-5">
        <Link
          href={"/login"}
          className="bg-transparent  py-2 px-4 rounded-lg text-white border border-white hover:bg-zinc-600 duration-200"
        >
          Log in
        </Link>
        <Link
          href={"register"}
          className="bg-yellow-500/90 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 duration-200"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};
export default LandingPageNavbar;
