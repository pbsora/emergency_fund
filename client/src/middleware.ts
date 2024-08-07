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

const configExists = async () => {
  const config = await fetch(
    `${process.env.CLIENT_URL}config`,
    {
      method: "GET",
      headers: {
        ...headers(),
        Cookie: `token=${cookies().get("token")?.value}`,
      },
      credentials: "include",
    }
  );

  if (!config.ok && config.status === 404) {
    return false;
  }
  return true;
};

export default async function middleware(req: NextRequest) {
  try {
    let data = await isAuthenticated(req);

    if (!(await configExists())) {
      return NextResponse.redirect(
        new URL("/first-login", req.url)
      );
    }

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
  } catch (error) {
    if (error.message === "fetch failed") {
      return NextResponse.redirect(
        new URL("/not-found", req.url)
      );
    }
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/config",
    "/transactions",
    "/login",
    "/register",
  ],
};
