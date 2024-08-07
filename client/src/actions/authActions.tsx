"use server";

import { CustomAggregateError } from "@/lib/Types & Interfaces";
import { AggregateErrorHelper, Parse } from "@/lib/helpers";
import API from "@/utils/api";
import { red } from "@mui/material/colors";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  username: z
    .string()
    .min(
      3,
      "Username needs to be at least 3 characters long"
    ),
  password: z
    .string()
    .min(
      6,
      "Password needs to be at least 6 characters long"
    ),
});

// export const loginAction = async (
//   _: unknown,
//   formData: FormData
// ) => {
//   try {
//     const { success, data, error } = loginSchema.safeParse(
//       Object.fromEntries(formData.entries())
//     );

//     if (!success) {
//       return { message: error.errors[0].message };
//     }

//     const { username, password } = data;

//     const res = await API.post("auth/login", {
//       username,
//       password,
//     });

//     const serverCookies = res.headers["set-cookie"];
//     const token = serverCookies![0]
//       .split(";")[0]
//       .split("=")[1];

//     cookies().set({
//       name: "token",
//       value: token,
//       httpOnly: true,
//       path: "/",
//       sameSite: "none",
//       secure: true,
//     });

//     if (res.status === 200 && res.statusText === "OK") {
//       redirect("/dashboard");
//     } else {
//       console.log("here");
//       return { message: "Something went wrong" };
//     }
//   } catch (error) {
//     //For some reason redirect cannot be used inside a try-catch block, so this is a fix
//     if (error.message === "NEXT_REDIRECT") {
//       redirect("/dashboard");
//     }
//     return (
//       ((error as AxiosError)?.response?.data as {
//         message: string;
//       }) || { message: "Something went wrong" }
//     );
//   }
// };

export const loginAction = async (
  _: unknown,
  formData: FormData
) => {
  try {
    const { success, data, error } = loginSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!success) {
      return { message: error.errors[0].message };
    }

    const { username, password } = data;

    const res = await API.post("auth/login", {
      username,
      password,
    });

    if (!res.ok) {
      const message = await res.json();
      return message;
    }

    const serverCookies = res.headers.getSetCookie();
    const token = serverCookies[0]
      .split(";")[0]
      .split("=")[1];
    const refreshToken = decodeURIComponent(
      serverCookies[1].split(";")[0].split("=")[1]
    );

    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      sameSite: "none",
      secure: true,
    });

    cookies().set({
      name: "refresh-token",
      value: refreshToken,
      httpOnly: true,
      path: "/",
      sameSite: "none",
      secure: true,
    });

    redirect("/dashboard");
  } catch (error) {
    //For some reason redirect cannot be used inside a try-catch block, so this is a workaround
    if (error.message === "NEXT_REDIRECT") {
      redirect("/dashboard");
    }

    if (Object.values(error)[0] instanceof AggregateError) {
      return AggregateErrorHelper(error);
    }

    console.error(error.message);

    return (
      ((error as AxiosError)?.response?.data as {
        message: string;
      }) || { message: "Something went wrong" }
    );
  }
};

const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long"),
  username: z
    .string()
    .transform((val) => val.trim())
    .refine(
      (val) => val.length >= 3,
      "Username must be at least 3 characters long"
    ),
  email: z
    .string()
    .email()
    .transform((value) => value.trim()),
  password: z
    .string()
    .transform((val) => val.trim())
    .refine(
      (val) => val.length >= 6,
      "Password must be at least 6 characters long"
    ),
  confirmPassword: z
    .string()
    .transform((val) => val.trim())
    .refine(
      (val) => val.length >= 6,
      "Password must match"
    ),
});

export const registerAction = async (
  _: unknown,
  formData: FormData
) => {
  try {
    const { success, data, error } =
      registerSchema.safeParse(
        Object.fromEntries(formData.entries())
      );

    if (!success) {
      return { message: error.errors[0].message };
    }

    const {
      name,
      username,
      email,
      password,
      confirmPassword,
    } = data;

    const res = await API.post("auth/register", {
      name,
      username,
      email,
      password,
      confirmPassword,
    });

    if (res.status === 200 && res.statusText === "OK") {
      redirect("/login");
    } else {
      const message = await res.json();
      return message;
    }
  } catch (error) {
    //For some reason redirect cannot be used inside a try-catch block, so this is a fix
    if (error.message === "NEXT_REDIRECT") {
      redirect("/login");
    }

    if (Object.values(error)[0] instanceof AggregateError) {
      return AggregateErrorHelper(error);
    }

    console.error(error.message);

    return (
      ((error as AxiosError)?.response?.data as {
        message: string;
      }) || {
        message: "Something went wrong",
      }
    );
  }
};

export const logoutAction = async () => {
  const res = await API.post("auth/logout");

  if (!res.ok) {
    const error = await res.json();
    if (Object.values(error)) {
      cookies().delete("token");
      cookies().delete("refresh-token");
      redirect("/");
    }
    console.log(
      Object.values(error) + ` - authActions.tsx`
    );
  }

  if (!res.ok) {
    return { message: "Something went wrong" };
  }

  cookies().delete("token");
  cookies().delete("refresh-token");
  redirect("/login");
};

export async function isAuthenticated() {
  const data = await API.get("auth/isAuthenticated").then(
    (res) => Parse(res)
  );

  return data;
}

export async function refreshToken() {
  const data = await API.post("auth/refresh");

  if (data.ok) {
    const serverCookies = data.headers.getSetCookie();
    const token = serverCookies[0]
      .split(";")[0]
      .split("=")[1];
    console.log(serverCookies);
    const refreshToken = serverCookies[1]
      .split(";")[0]
      .split("=")[1];

    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
    });
    cookies().set({
      name: "refresh-token",
      value: refreshToken,
      httpOnly: true,
    });

    return true;
  }
  return false;
}
