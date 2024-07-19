"use client";

import { login } from "@/config/store/store";
import { useAppDispatch } from "@/hooks/ReduxHooks";
import { User } from "@/lib/Types & Interfaces";
import { useEffect } from "react";
import SidebarLink from "./SidebarLink";
import { MdDashboard } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { TbTransactionDollar } from "react-icons/tb";
import { HiLogout } from "react-icons/hi";
import { logoutAction } from "@/actions/authActions";
import { useFormState, useFormStatus } from "react-dom";
import { Oval } from "react-loader-spinner";

const Sidebar = ({ user }: { user: User }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(login(user));
  }, [dispatch, user]);

  return (
    <div className="h-screen min-w-[20%] hidden bg-zinc-900  text-white lg:flex flex-col">
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
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};
export default Sidebar;

const LogoutButton = () => {
  const { pending } = useFormStatus();
  const [_, action] = useFormState(logoutAction, null);

  return (
    <form
      className={` w-full py-4 flex justify-center items-center hover:text-yellow-400 gap-3 text-base lg:text-lg font-light relative before:absolute before:left-0 before:h-[25px] before:w-[2px] before:top-[50%] before:-translate-y-[50%] transition-colors duration-300`}
      action={action}
    >
      <button
        className="flex justify-start w-40 items-center gap-2 lg:gap-4"
        disabled={pending}
      >
        {pending ? (
          <Oval width={25} color="#FFC107" />
        ) : (
          <HiLogout className="text-xl rotate-180" />
        )}
        <p className="text-lg">Logout</p>
      </button>
    </form>
  );
};
