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

  console.log(pathname.slice(1));
  return (
    <Link
      href={href}
      className={`${
        pathname === href &&
        "before:bg-yellow-400 text-yellow-400 dark:text-zinc-900 before:dark:bg-zinc-900"
      } w-full py-4 flex justify-center items-center gap-3 text-base lg:text-lg font-light relative before:absolute before:left-0 before:h-[25px] before:w-[2px] before:top-[50%] before:-translate-y-[50%] transition-colors duration-500`}
    >
      <div className="flex justify-start w-40 items-center gap-2 lg:gap-4">
        {children}
      </div>
    </Link>
  );
};
export default SidebarLink;
