import Link from "next/link";
import { Button } from "../ui/button";

const Action = () => {
  return (
    <div className="relative bg-slate-50 lg:py-20 lg:px-36 my-16 lg:my-0">
      <div className="absolute -top-8 left-3 lg:top-12 lg:left-[9.5rem] size-36 z-10 bg-transparent bg-[radial-gradient(#FACC15_2px,transparent_1px)] [background-size:11px_11px]" />
      <div className="flex flex-col lg:flex-row mx-10 px-3 rounded-lg lg:px-8 py-5 gap-7 items-center bg-slate-50 z-20 relative">
        <div className="flex flex-col gap-5 flex-1">
          <h2 className="text-2xl font-bold text-zinc-800">
            Join us!
          </h2>
          <p className="font-semibold text-zinc-400 text-balance">
            Start your journey to financial freedom by
            creating an emergency fund today.
          </p>
        </div>
        <Button className="w-7/12 lg:w-2/12 bg-yellow-400 hover:bg-yellow-600 text-white font-semibold self-start">
          <Link href={"/register"} className="">
            Start your journey!
          </Link>
        </Button>
      </div>
    </div>
  );
};
export default Action;
