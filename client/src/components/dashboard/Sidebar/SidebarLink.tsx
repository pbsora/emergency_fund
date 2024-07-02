"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const SidebarLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`${
        pathname === href &&
        "before:bg-yellow-400 text-yellow-400"
      } w-full py-4 flex justify-center items-center hover:text-yellow-400 gap-3 text-base lg:text-lg font-light relative before:absolute before:left-0 before:h-[25px] before:w-[2px] before:top-[50%] before:-translate-y-[50%] transition-colors duration-300`}
    >
      <div className="flex justify-start w-40 items-center gap-2 lg:gap-4">
        {children}
      </div>
    </Link>
  );
};
export default SidebarLink;
