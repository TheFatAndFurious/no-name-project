'use client'

import { Gallery } from "@/types"
import { fetchSignedUrls, getGaleries, getGaleryCoverPics, getPictureUrlFromItsId } from "@/utils/supabase"
import { useEffect, useState } from "react"
import Wrapper from "../components/Wrapper"
import Link from "next/link"
import Loading from "../components/Loading"
export const dynamic = "auto"

interface Galerie {
    id: number
    title: string
    cover_pic: string
}


export default function galeries () {
     const [galeries, setGaleries] = useState([])
     const [loading, setLoading] = useState<boolean>(true)
     
     useEffect(() => {
         async function fetchData() {
             try {
                 const data = await getGaleries()
                 console.log("🚀 ~ file: page.tsx:26 ~ fetchData ~ data:", data)
                 const test = await getGaleryCoverPics()
                 if (test) {
                     const urls = test.map(url => url.pictures_id)
                     const supabaseUrls = await getPictureUrlFromItsId(urls)
                     const jemerdouille = await fetchSignedUrls(supabaseUrls)
                     const wholeInfos = data?.map((item, index) => {
                         return {
                             id: item.id,
                             name: item.name,
                             cover_pic: jemerdouille.url[index],
                             createdAt: item.created_at,
                            }
                        })
                        setGaleries(wholeInfos)
                 }
                } catch (error) {
                    console.log(error)
                } finally {
                    setLoading(false)
                }
            }
            fetchData()
        }, [])
        console.log(galeries)        
     if (loading) return <Loading />
    return (
        <Wrapper>
        <div className="flex">
            {galeries.map((item) => (
                <div key={item.id}>
                    <Link href={`/galeries/${item.id}`}>
                        <div className="flex column px-2">
                            <h1 className="text-center">{item.name}</h1>
                            <img className="w-80 h-72 object-cover" src={item.cover_pic} alt="" />
                            <p>{item.createdAt}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
        </Wrapper>
     )
}