import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"



export async function POST(req: Request) {
    const supabase = createServerComponentClient({ cookies });

    const urlsToInsert = await req.json() 

    try  
        {const { data } = await supabase
        .from("pictures")
        .insert(urlsToInsert.pictures)
    } catch (error) {
        console.error(error)
    }
}