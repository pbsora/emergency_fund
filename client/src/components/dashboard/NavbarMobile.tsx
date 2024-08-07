"use client";

import { useAppSelector } from "@/hooks/ReduxHooks";
import { Capitalize } from "@/lib/helpers";
import SidebarMobile from "./Sidebar/SidebarMobile";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const Navbar = () => {
  const { name, profilePicture } = useAppSelector(
    (state) => state.user.value
  );

  return (
    <div className="w-full py-3 z-10 px-4 md:p-4 lg:p-8 flex flex-col-reverse md:flex-row items-center justify-between gap-4 lg:hidden shadow-md bg-zinc-900 text-zinc-200">
      <div className="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-6">
        <div className="lg:hidden text-2xl flex items-center">
          <SidebarMobile />
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="size-10">
            <AvatarImage
              src={profilePicture}
              alt={name}
              className="object-cover"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <p className="font-bold text-zinc-200">
            {Capitalize(name)}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
