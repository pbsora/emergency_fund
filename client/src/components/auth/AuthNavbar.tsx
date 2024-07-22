"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

const AuthNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full h-16 shadow-md fixed flex justify-between px-10 items-center bg-zinc-900">
      <Link href={"/"} className="flex items-center gap-6">
        <img
          src={"/logo.png"}
          alt="logo"
          className="w-36"
        />
      </Link>
      {pathname === "/register" ? (
        <Button className="bg-zinc-200 text-black">
          <Link href={"/login"}>Log-in</Link>
        </Button>
      ) : (
        <Button className="bg-zinc-200 text-black">
          <Link href={"/register"}>Sign-up</Link>
        </Button>
      )}
    </nav>
  );
};
export default AuthNavbar;
