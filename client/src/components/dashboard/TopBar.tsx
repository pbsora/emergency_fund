"use client";

import { useAppSelector } from "@/hooks/ReduxHooks";
import { Capitalize } from "@/lib/helpers";
import { CiSearch } from "react-icons/ci";
import SidebarMobile from "./Sidebar/SidebarMobile";

const TopBar = () => {
  const { name, profilePicture } = useAppSelector(
    (state) => state.user.value
  );

  return (
    <div className="w-full py-2 px-3 md:p-8 flex-col-reverse md:flex-row items-center justify-between gap-4 hidden lg:flex">
      <div className="w-full lg:w-72 bg-slate-100 flex items-center justify-center py-1">
        <input
          type="text"
          name="search"
          className="bg-transparent py-2 flex-1 text-sm pl-3 focus:outline-none"
          placeholder="Search"
        />
        <div className="lg:mr-2">
          <CiSearch size={25} />
        </div>
      </div>
      <div className="flex items-center justify-between md:justify-end w-full lg:w-auto gap-6">
        <div className="md:hidden text-2xl">
          <SidebarMobile />
        </div>
        <div className="flex items-center gap-4">
          <img
            src={profilePicture}
            alt={name}
            className="size-10 lg:size-12 object-cover rounded-full"
          />
          <p className="font-semibold">
            {Capitalize(name)}
          </p>
        </div>
      </div>
    </div>
  );
};
export default TopBar;
