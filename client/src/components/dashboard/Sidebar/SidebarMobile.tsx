"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import ThemeButtonSidebar from "./ThemeButtonSidebar";
import { HiLogout } from "react-icons/hi";

const SidebarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeSidebar = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <button className="z-50" onClick={openSidebar}>
        <RxHamburgerMenu />
      </button>
      <div
        className={`${
          isOpen ? "fixed" : "hidden"
        } z-40 bg-zinc-900/60 pointer-events-none  top-0 left-0 w-full h-screen duration-200 ease-in-out`}
        style={{ pointerEvents: "auto" }}
        onClick={closeSidebar}
      ></div>
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-[101vw]"
        } bg-zinc-900 flex flex-col items-center justify-between w-3/4 h-screen z-50 absolute top-0 left-0 duration-200 ease-in-out`}
      >
        <div className="flex justify-between items-center py-10 w-full px-3">
          <Button
            className="text-3xl"
            onClick={closeSidebar}
            variant={"ghost"}
          >
            <RxHamburgerMenu />
          </Button>
          <ThemeButtonSidebar />
        </div>
        <ul className=" items-center justify-center font-montserrat flex flex-col gap-6">
          <li>
            <Link
              href="/dashboard"
              className="text-3xl"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/transactions"
              className="text-3xl"
              onClick={() => setIsOpen(false)}
            >
              Savings
            </Link>
          </li>
          <li>
            <Link
              href="/config"
              className="text-3xl"
              onClick={() => setIsOpen(false)}
            >
              Settings
            </Link>
          </li>
        </ul>
        <Button
          className="mb-16 text-xl bg-transparent py-6 px-4 gap-3 flex"
          variant={"outline"}
        >
          <HiLogout className="text-xl rotate-180" /> Logout
        </Button>
      </div>
    </>
  );
};
export default SidebarMobile;
