"use client";

import { Button } from "@/components/ui/button";
import { logoutAction } from "@/actions/authActions";
import { useFormState, useFormStatus } from "react-dom";
import { Oval } from "react-loader-spinner";
import Link from "next/link";

const FirstLoginNavbar = () => {
  const [_, action] = useFormState(logoutAction, null);

  return (
    <nav className="w-full h-16 shadow-md fixed flex justify-between px-10 items-center bg-zinc-900">
      <Link href={"/"} className="flex items-center gap-6">
        <img
          src={"/logo.png"}
          alt="logo"
          className="w-36"
        />
      </Link>
      <form action={action}>
        <LogoutButton />
      </form>
    </nav>
  );
};
export default FirstLoginNavbar;

const LogoutButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-24 bg-zinc-200 text-black">
      {pending ? (
        <Oval color="#fff" height={20} width={20} />
      ) : (
        "Logout"
      )}
    </Button>
  );
};
