"use client";

import { handleLogin } from "@/actions/authActions";

const LoginForm = () => {
  return (
    <form
      action={handleLogin}
      className="w-screen h-screen flex flex-col items-center justify-center gap-6"
    >
      <input
        type="text"
        name="username"
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};
export default LoginForm;
