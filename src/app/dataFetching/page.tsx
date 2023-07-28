import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";


//TODO

const supabase = createServerComponentClient({cookies});

export default async function Fetcher() {
    const { data: galeries} = await supabase.from('galeries').select() 
    console.log(galeries)
    if(!galeries) {
        return <p>No galeries found</p>
    }

    else {
        return galeries.map((galerie) => (
            <p>{galerie.name}</p>
        ))
    }
}