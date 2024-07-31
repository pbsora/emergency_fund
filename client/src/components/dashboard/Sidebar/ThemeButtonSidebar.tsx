"use client";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeButtonSidebar = () => {
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted)
    return (
      <Button
        size={"icon"}
        className="bg-transparent text-white size-10 text-2xl border border-zinc-200"
        variant={"ghost"}
        onClick={() =>
          setTheme(theme === "dark" ? "light" : "dark")
        }
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </Button>
    );
};
export default ThemeButtonSidebar;
