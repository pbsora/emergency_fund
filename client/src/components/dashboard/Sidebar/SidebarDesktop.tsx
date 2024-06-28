"use client";

import { login } from "@/config/store/store";
import { useAppDispatch } from "@/hooks/ReduxHooks";
import { User } from "@/lib/Types & Interfaces";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import SidebarLink from "./SidebarLink";
import { MdDashboard } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { TbTransactionDollar } from "react-icons/tb";
import { HiLogout } from "react-icons/hi";

const Sidebar = ({ user }: { user: User }) => {
  const dispatch = useAppDispatch();

  const { setTheme } = useTheme();

  useEffect(() => {
    dispatch(login(user));
  }, [dispatch, user]);

  return (
    <div className="h-screen min-w-[20%] hidden bg-zinc-900 dark:bg-yellow-500/90 text-white lg:flex flex-col">
      <div className="flex justify-center items-center gap-4 mt-10">
        <img
          src={"/costs_logo.png"}
          alt="logo"
          className="size-10"
        />
        <h2 className="text-xl bold">Costs</h2>
      </div>
      <div className="flex flex-col mt-10 flex-1">
        <SidebarLink href={"/dashboard"}>
          <MdDashboard className="text-lg lg:text-xl" />
          <p>Dashboard</p>
        </SidebarLink>
        <SidebarLink href={"/transactions"}>
          <TbTransactionDollar className="text-lg lg:text-xl" />
          <p>Transactions</p>
        </SidebarLink>

        <SidebarLink href={"/config"}>
          <FaGear size={22} />
          <p>Settings</p>
        </SidebarLink>
        <div className="mt-auto mb-10">
          <SidebarLink href={"/config"}>
            <HiLogout className="text-xl rotate-180" />
            <p className="text-lg">Logout</p>
          </SidebarLink>
        </div>
      </div>
      <div>
        <button onClick={() => setTheme("light")}>
          Light
        </button>
        <button onClick={() => setTheme("dark")}>
          Dark
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
