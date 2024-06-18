"use client";

import { loginAction } from "@/actions/authActions";
import { useFormState, useFormStatus } from "react-dom";

const LoginForm = () => {
  const [error, action] = useFormState(loginAction, null);

  return (
    <form
      action={action}
      className="w-2/4 h-screen flex flex-col items-center justify-center gap-6 text-white border-white border m-auto"
    >
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="bg-zinc-800 "
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="bg-zinc-800 "
      />
      {error && (
        <div className="text-red-500 text-sm w-56 text-center">
          {error.message}
        </div>
      )}
      <SubmitButton />
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Loading" : "Log-in"}
    </button>
  );
};

export default LoginForm;
