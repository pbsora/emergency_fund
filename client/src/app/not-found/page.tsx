import NotFoundSVG from "@/components/not-found/NotFoundSVG";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <nav className="w-full h-16 shadow-md fixed flex justify-between px-10 items-center bg-zinc-900">
        <Link
          href={"/"}
          className="flex items-center gap-6"
        >
          <img
            src={"/logo.png"}
            alt="logo"
            className="w-36"
          />
        </Link>
      </nav>
      <main className="w-full h-screen flex flex-col items-center justify-center gap-7">
        <NotFoundSVG />
        <h1 className="text-4xl text-zinc-900">
          Something went wrong!
        </h1>
        <Link
          href={"/"}
          className="text-2xl text-blue-500 hover:underline"
        >
          Go back home
        </Link>
      </main>
    </>
  );
};
export default NotFound;
