"use server";

import API from "@/utils/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const handleLogin = async (formData: FormData) => {
  const { success, data } = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!success) {
    console.error("Invalid form data");
    return;
  }

  const { username, password } = data;

  const res = await API.post("auth/login", {
    username,
    password,
  });

  const serverCookies = res.headers["set-cookie"];
  const token = serverCookies![0]
    .split(";")[0]
    .split("=")[1];

  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
  });

  if (res.status === 200 && res.statusText === "OK") {
    redirect("/dashboard");
  } else {
    console.error("Login failed");
  }
};
