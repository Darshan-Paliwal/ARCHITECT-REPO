import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }
  return NextResponse.next();
}
