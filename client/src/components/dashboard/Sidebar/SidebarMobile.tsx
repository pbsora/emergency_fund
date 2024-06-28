"use client";

import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

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
        } bg-slate-100 flex flex-col items-center justify-center w-3/4 h-screen z-50 absolute top-0 left-0 duration-200 ease-in-out`}
      >
        <button
          className=" z-50 absolute top-5 left-5"
          onClick={closeSidebar}
        >
          <RxHamburgerMenu />
        </button>
        <ul className=" items-center justify-center font-montserrat flex flex-col gap-6">
          <li>
            <a
              href="#hero"
              className="text-3xl"
              onClick={() => setIsOpen(false)}
            >
              Page top
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-3xl"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#skills"
              className="text-3xl"
              onClick={() => setIsOpen(false)}
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#portfolio"
              className="text-3xl"
              onClick={() => setIsOpen(false)}
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-3xl"
              onClick={() => setIsOpen(false)}
            >
              Contact me
            </a>
          </li>
          <li>
            <Link
              href={"/br"}
              className="text-3xl text-center"
              onClick={() => setIsOpen(false)}
            >
              Portuguese
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default SidebarMobile;
