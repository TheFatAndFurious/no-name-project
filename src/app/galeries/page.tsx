'use client'

import { Gallery } from "@/types"
import { getGaleries } from "@/utils/supabase"
import { useEffect, useState } from "react"
import Wrapper from "../components/Wrapper"
import Link from "next/link"
export const dynamic = "auto"



export default function galeries () {
     const [galeries, setGaleries] = useState<Gallery[]>([])
     const [loading, setLoading] = useState<boolean>(true)
    
     useEffect(() => {
         async function fetchData() {
            try {
                const data = await getGaleries()
                setGaleries(data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
         }
         fetchData()
     }, [])
     console.log(galeries)
     if (loading) return <div>Loading...</div>
    return (
        <Wrapper>
        <div>
            {galeries.map((item) => (
                <div key={item.id}>
                    <Link href={`/galeries/${item.id}`}><h1>{item.name}</h1></Link>
                </div>
            ))}
        </div>
        </Wrapper>
     )
}