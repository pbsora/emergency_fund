"use client";

import API from "@/utils/api";
import { FormEvent } from "react";

const LoginForm = () => {
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const res = await API.post("auth/login", {
      username,
      password,
    });

    console.log(res.data);
  };

  return (
    <form
      onSubmit={handleSubmit}
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
