import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest, res: NextResponse) {
    const supabase = createServerComponentClient({ cookies });

    const urlsToInsert = await req.json() 

    try  
        {const { data, error } = await supabase
        .from("pictures")
        .insert(urlsToInsert.pictures)
        .select("id")

        if (error) {
            throw error;
        }
        console.log(data)
        return NextResponse.json({success: true, data: data});
        }
        catch (error) {
            console.error(error)
            return NextResponse.json({success: false}, {error: error.message})
        }
}