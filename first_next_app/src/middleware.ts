import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublic= path==="/login" || path=="/signup" || path=="/verifyemial";

  const token = request.cookies.get("token")?.value || "";

  if(isPublic && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if(!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile", "/profile/(.*)", "/login", "/signup"],
};
