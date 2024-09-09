import { NextResponse } from "next/server";
import { auth } from "@/utils/auth";

const authPages = ["/login", "/forgot-password"];

export default auth((req) => {
  const path = req.nextUrl.pathname;

  if (req.auth) {
    if (authPages.includes(path)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  if (!req.auth) {
    if (authPages.includes(path)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
