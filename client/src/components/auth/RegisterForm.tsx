"use client";

import { registerAction } from "@/actions/authActions";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Oval } from "react-loader-spinner";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import InputWithIcon from "../ui/inputWithIcon";
import { MdEmail } from "react-icons/md";

const RegisterForm = () => {
  const [error, action] = useFormState(
    registerAction,
    null
  );

  return (
    <div className="w-full md:w-7/12 lg:w-4/12 2xl:w-3/12 h-screen m-auto flex flex-col items-center justify-center container gap-10">
      <div className="flex flex-col items-center gap-2 mt-4">
        <FaUserCircle size={40} className="text-blue-500" />
        <h1 className="text-2xl font-semibold">
          Create your account!
        </h1>
      </div>
      <form
        action={action}
        className="w-full flex flex-col items-center justify-center gap-6 "
      >
        <InputWithIcon name="name" variant="text">
          <CiUser
            size={20}
            className="absolute right-3 z-10 bg-white size-6 text-zinc-500 dark:bg-transparent"
          />
        </InputWithIcon>
        <InputWithIcon name="username" variant="text">
          <CiUser
            size={20}
            className="absolute right-3 z-10 bg-white size-6 text-zinc-500 dark:bg-transparent"
          />
        </InputWithIcon>
        <InputWithIcon name="email" variant="email">
          <MdEmail
            size={20}
            className="absolute right-3 z-10 bg-white size-6 text-zinc-500 dark:bg-transparent"
          />
        </InputWithIcon>
        <div className="flex w-full gap-2 pt-2">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="py-2 px-2 flex-1 border-b border-zinc-400 focus:outline-none focus:border-blue-500 bg-transparent w-5/12"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="py-2 px-2 flex-1 border-b border-zinc-400 focus:outline-none focus:border-blue-500 bg-transparent w-5/12"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm w-56 text-center">
            {error.message}
          </div>
        )}
        <RegisterButton />
        <hr className="w-full border-b border-zinc-200/60" />
        <div>
          <p>
            Already have an account?{" "}
            <Link
              href={"/login"}
              className="text-blue-700 hover:underline underline-offset-2"
            >
              Log-in instead
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

const RegisterButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="w-2/4">
      {pending ? (
        <Oval color="#fff" height={20} width={20} />
      ) : (
        "Register"
      )}
    </Button>
  );
};

export default RegisterForm;
