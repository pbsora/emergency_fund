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
import { useEffect, useState } from "react";

const TopBar = () => {
  const { name, profilePicture } = useAppSelector(
    (state) => state.user.value
  );
  const [isMounted, setIsMounted] = useState(false);

  const { setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <TopBarSkeleton />;
  }

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
          <Avatar className="size-12">
            <AvatarImage
              src={profilePicture}
              alt={name}
              className="object-cover"
            />
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

const TopBarSkeleton = () => {
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
            <DropdownMenuItem>Light</DropdownMenuItem>
            <DropdownMenuItem>Dark</DropdownMenuItem>
            <DropdownMenuItem>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center justify-between md:justify-end w-full lg:w-auto gap-6">
        <div className="md:hidden text-2xl">
          <SidebarMobile />
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="size-12">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <p className="font-semibold w-14 h-6 rounded-full animate-pulse bg-zinc-300"></p>
        </div>
      </div>
    </div>
  );
};
