
import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const adminPath = "/admin";
  const restricted = "/app";

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session?.user.role != "member") {
    if (req.nextUrl.pathname.startsWith(restricted)) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/unauthenticated";
        return NextResponse.redirect(redirectUrl);
    } else if (req.nextUrl.pathname.startsWith(adminPath)) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/login";
      return NextResponse.redirect(redirectUrl);
    }
  }
}

export const config = {
  matcher: ["/api/app/:path*", "/admin/:path*", "/app/:path*"],
};
