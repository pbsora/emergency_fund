import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function isAuthenticated(req: NextRequest) {
  const data = await fetch(
    `${process.env.CLIENT_URL}auth/isAuthenticated`,
    {
      headers: {
        ...headers(),
        Cookie: `token=${
          cookies().get("token")?.value
        }, refresh-token=${
          cookies().get("refresh-token")?.value
        }`,
      },
      credentials: "include",
    }
  ).then((res) => res.json());

  return data;
}

async function refreshToken(req: NextRequest) {
  const data = await fetch(
    `${process.env.CLIENT_URL}auth/refresh`,
    {
      method: "POST",
      headers: {
        ...headers(),
        Cookie: `token=${
          cookies().get("token")?.value
        }, refresh-token=${
          cookies().get("refresh-token")?.value
        }`,
      },
      credentials: "include",
    }
  );

  if (data.ok) {
    const serverCookies = data.headers
      .getSetCookie()[0]
      .split(",");
    const token = serverCookies[0]
      .split(";")[0]
      .split("=")[1];
    console.log(serverCookies);
    const refreshToken = decodeURIComponent(
      serverCookies[1].split(";")[0].split("=")[1]
    );

    cookies().delete("token");
    cookies().delete("refresh-token");

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

    console.log(token, refreshToken);

    return true;
  }
  return false;
}

export default async function middleware(req: NextRequest) {
  let data = await isAuthenticated(req);

  // if (!data) {
  //   const newToken = await refreshToken(req);
  //   if (newToken) {
  //     data = await isAuthenticated(req);
  //   }
  // }

  if (
    req.url.includes("login") ||
    req.url.includes("register")
  ) {
    if (data) {
      return NextResponse.redirect(
        new URL("/dashboard", req.url)
      );
    }
  } else {
    if (!data) {
      return NextResponse.redirect(
        new URL("/login", req.url)
      );
    }
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/config",
    "/transactions",
    "/login",
    "/register",
  ],
};
