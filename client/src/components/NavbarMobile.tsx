"use client";

import { useAppSelector } from "@/hooks/ReduxHooks";
import { Capitalize } from "@/lib/helpers";
import SidebarMobile from "./dashboard/Sidebar/SidebarMobile";

const Navbar = () => {
  const { name, profilePicture } = useAppSelector(
    (state) => state.user.value
  );

  return (
    <div className="w-full py-2 z-10 px-4 md:p-4 lg:p-8 flex flex-col-reverse md:flex-row items-center justify-between gap-4 lg:hidden shadow-lg">
      <div className="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-6">
        <div className="lg:hidden text-2xl">
          <SidebarMobile />
        </div>
        <div className="flex items-center gap-4">
          <img
            src={profilePicture}
            alt={name}
            className="size-10 lg:size-12 object-cover rounded-full"
          />
          <p className="">{Capitalize(name)}</p>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
