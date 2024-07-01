"use client";

import { useAppSelector } from "@/hooks/ReduxHooks";
import { Capitalize } from "@/lib/helpers";
import SidebarMobile from "./Sidebar/SidebarMobile";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

const TopBar = () => {
  const { name, profilePicture } = useAppSelector(
    (state) => state.user.value
  );

  const { setTheme } = useTheme();

  return (
    <div className="w-full h-[10%] py-2 px-3 md:p-8 flex-col-reverse md:flex-row items-center justify-between gap-4 hidden lg:flex">
      <div className="w-full lg:w-72  flex items-center justify-start py-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setTheme("light")}
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
            >
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("system")}
            >
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center justify-between md:justify-end w-full lg:w-auto gap-6">
        <div className="md:hidden text-2xl">
          <SidebarMobile />
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="size-8">
            <AvatarImage src={profilePicture} alt={name} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <p className="font-semibold">
            {Capitalize(name)}
          </p>
        </div>
      </div>
    </div>
  );
};
export default TopBar;
