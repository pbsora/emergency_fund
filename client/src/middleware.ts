import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const data = await fetch(
    "http://localhost:5065/api/auth/isAuthenticated",
    {
      headers: {
        ...headers(),
        Cookie: `token=${cookies().get("token")?.value}`,
      },
      credentials: "include",
    }
  ).then((res) => res.json());

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
