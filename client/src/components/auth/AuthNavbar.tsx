"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

const AuthNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full h-16 shadow-md fixed flex justify-between px-10 items-center">
      <div className="flex items-center gap-6">
        <img
          src={"/costs_logo.png"}
          alt="logo"
          className="size-10"
        />
        <Link href={"/"} className="font-semibold text-xl">
          Costs
        </Link>
      </div>
      {pathname === "/register" ? (
        <Button>
          <Link href={"/login"}>Log-in</Link>
        </Button>
      ) : (
        <Button>
          <Link href={"/register"}>Sign-up</Link>
        </Button>
      )}
    </nav>
  );
};
export default AuthNavbar;
