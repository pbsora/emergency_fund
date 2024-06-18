"use client";

import { registerAction } from "@/actions/authActions";
import { useFormState, useFormStatus } from "react-dom";

const RegisterForm = () => {
  const [error, action] = useFormState(
    registerAction,
    null
  );

  return (
    <form
      action={action}
      className="w-2/4 h-screen flex flex-col items-center justify-center gap-6 text-white border-white border m-auto"
    >
      <input
        type="text"
        name="name"
        className="bg-zinc-700"
        placeholder="Name"
      />
      <input
        type="text"
        name="username"
        className="bg-zinc-700"
        placeholder="Username"
      />
      <input
        type="email"
        name="email"
        className="bg-zinc-700"
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        className="bg-zinc-700"
        placeholder="Password"
      />
      <input
        type="password"
        name="confirmPassword"
        className="bg-zinc-700"
        placeholder="Confirm Password"
      />
      {error && (
        <div className="text-red-500 text-sm w-56 text-center">
          {error.message}
        </div>
      )}
      <RegisterButton />
    </form>
  );
};

const RegisterButton = () => {
  const { pending } = useFormStatus();

  return (
    <button>{pending ? "Loading" : "Register"}</button>
  );
};

export default RegisterForm;
