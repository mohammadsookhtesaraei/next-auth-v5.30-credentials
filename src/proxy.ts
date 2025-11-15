// middleware.ts
import { auth } from "@/libs/auth.config";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const session = await auth();

  const publicPaths = ["/login", "/register"];
  const protectedPaths = ["/dashboard"];

  // کاربر لاگین نکرده و مسیر protected
  if (!session?.user && protectedPaths.some(path => url.pathname.startsWith(path))) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // کاربر لاگین کرده و مسیر login/register
  if (session?.user && publicPaths.some(path => url.pathname.startsWith(path))) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// مسیرهایی که میدلور باید روی آن‌ها اجرا شود
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
