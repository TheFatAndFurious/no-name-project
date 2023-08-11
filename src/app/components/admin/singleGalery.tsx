
import { useEffect, useState } from "react"
import { supabase } from "../../../../supabase"

interface SingleGaleryProps {
    galery: Array<any>
}

export default function SingleGalery () {
    const [picture, setPicture] = useState<SingleGaleryProps[]>([])


    useEffect(()=> {
        async function getGalery(){
            try {
                const { data } = await supabase.from("pictures").select().eq("galeries_id", "1")
            if(data) setPicture(data)
            } catch (error) {console.error(error)}
        }
        getGalery();
    }, [])
    


    return (
        <pre>{JSON.stringify(picture, null, 2)}</pre>
    )
}