"use client";

import SidebarUser from "@/components/config/SidebarUser";
import { login } from "@/config/store/store";
import {
  useAppDispatch,
  useAppSelector,
} from "@/hooks/ReduxHooks";
import { User } from "@/lib/Types & Interfaces";
import Link from "next/link";
import { useEffect } from "react";

const Sidebar = ({ user }: { user: User }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(login(user));
  }, [dispatch, user]);

  return (
    <div className="h-screen w-72 bg-yellow-500">
      <SidebarUser />
      <div className="flex flex-col gap-6 pl-8 mt-10">
        <Link href={"/dashboard"}>Dashboard</Link>
        <Link href={"/dashboard/config"}>Config</Link>
      </div>
    </div>
  );
};
export default Sidebar;
