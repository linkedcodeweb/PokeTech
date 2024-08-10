import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const allCookies = req.cookies.getAll();
  const sessionCookie = allCookies.some((cookie) =>
    cookie.name.includes("next-auth.session-token")
  );

  const url = req.url;

  if (!sessionCookie && url.includes("/profile")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (sessionCookie && (url.includes("/login") || url.includes("/register"))) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }
}
