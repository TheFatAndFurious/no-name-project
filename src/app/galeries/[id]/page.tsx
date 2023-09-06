'use client'

import { getGaleries } from "@/utils/supabase"
import { useEffect, useState } from "react"
import { supabase } from "../../../../supabase"


export default function Page({ params }: { params : { id : string } }) {
    const [pictures, setPictures] = useState(null)
    console.log(typeof(params.id))
    useEffect(() => {
        async function getPictures(id) {
            try {
                const { data } = await supabase.from("pictures").select("*").eq("id", id)
                setPictures(data)
            } catch (error) {
                console.error(error)
            }
        }
        getPictures(Number(params.id))
    }, [params.id])
console.log(pictures)
    return (
        <>
            Test {params.id}
            {pictures?.map((picture) => (
                <div key={picture.id}>
                    <p>{picture.url}</p>
                </div>
            ))}
        </>
    )
    }