// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// import { redirect } from "next/dist/server/api-utils";
// import { NextResponse, NextRequest } from "next/server";


// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient({ req, res });
//   const adminPath = "/app"

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if(session){
//     console.log("coucou")
//   } else {
//     console.log("no session my man")
//   }

//   // if (session && req.nextUrl.pathname === "/") {
//   //   return NextResponse.redirect(new URL("account", req.url));
//   // }

//   // if(!session && req.nextUrl.pathname.startsWith(adminPath)) {
//   //   return new NextResponse(
//   //     JSON.stringify({message: "authorization failed"}), {
//   //       status: 403, headers: { "Content-type": "application/json"}
//   //     }
//   //   )
//   // }
  
//   // if (!session && req.nextUrl.pathname !== "/") {
//   //   return NextResponse.redirect(new URL("/", req.url));
//   // }


//   return res;
// }

// export const config = {
//   matcher: ["/api/app/:path*", "/app/:path*"],
// };


import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const adminPath = "/app";
  const apiAdminPath = "/api/app";

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    console.log("middleware, no session");
    if (req.nextUrl.pathname.startsWith(apiAdminPath)) {
      return new NextResponse(
        JSON.stringify({ message: "authorization failed" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    } else if (req.nextUrl.pathname.startsWith(adminPath)) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/login";
      return NextResponse.redirect(redirectUrl);
    }
  }
}

export const config = {
  matcher: ["/api/app/:path*", "/app/:path*"],
};
