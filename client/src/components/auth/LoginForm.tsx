"use client";

import { loginAction } from "@/actions/authActions";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Oval } from "react-loader-spinner";
import { IoEnterOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import InputWithIcon from "../ui/inputWithIcon";
import { RiLockPasswordFill } from "react-icons/ri";
import Link from "next/link";

const LoginForm = () => {
  const [error, action] = useFormState(loginAction, null);

  return (
    <div className="w-full md:w-7/12 lg:w-4/12 2xl:w-3/12 h-screen m-auto flex flex-col justify-center container gap-10">
      <div className="flex flex-col items-center gap-2 w-full">
        <IoEnterOutline
          size={40}
          className="text-blue-500"
        />
        <h2 className="font-semibold text-2xl text-zinc-900">
          Welcome!
        </h2>
        <h3 className="text-base text-zinc-400">
          Sign in to your accont
        </h3>
      </div>
      <form
        action={action}
        className="w-full flex flex-col items-center justify-center gap-6"
      >
        <InputWithIcon name="username">
          <CiUser
            size={20}
            className="absolute right-3 z-10 bg-white size-6 text-zinc-500 "
          />
        </InputWithIcon>
        <InputWithIcon name="password">
          <RiLockPasswordFill
            size={20}
            className="absolute right-3 z-10 bg-white text-zinc-500 size-6"
          />
        </InputWithIcon>
        {error && (
          <div className="text-red-500 text-sm w-56 text-center">
            {error.message}
          </div>
        )}
        <SubmitButton />
        <hr className="w-full border-b border-zinc-200/60" />
        <div>
          <p>
            Don't have an account?{" "}
            <Link
              href={"/register"}
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

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-2/4"
    >
      {pending ? (
        <Oval color="#fff" height={20} width={20} />
      ) : (
        "Log-in"
      )}
    </Button>
  );
};

export default LoginForm;
