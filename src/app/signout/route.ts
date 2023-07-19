import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server";

export async function  POST(req: NextRequest) {
    const supabase = createRouteHandlerClient({cookies})


// Check if a session exists
const {
    data: { session},
} = await supabase.auth.getSession();

if (session) {
    await supabase.auth.signOut();
}

return NextResponse.redirect(new URL('/', req.url), {
    status: 302,
})
}