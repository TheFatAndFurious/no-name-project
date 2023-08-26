import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const supabase = createServerComponentClient({ cookies });
    
    const galeriesToDelete = await req.json()
    console.log(galeriesToDelete)

    try {
        const { data, error } = await supabase
            .from("galeries")
            .delete()
            .eq('id', galeriesToDelete)
            console.log(data, error)

        if( error ) {
            throw error
        }
        return NextResponse.json({ success: true})

            
    } catch (error) {
            console.error(error)
            return NextResponse.json({ success: false})
    }

}