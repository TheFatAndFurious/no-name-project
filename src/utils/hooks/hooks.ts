import { useState, useEffect } from "react";
import { supabase } from "../../../supabase";
import  { fetchSignedUrls }  from "../supabase"

// Getting urls references from a specific gallery 
export function useGallery(id: number) {
    const [pictures, setPictures] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [signedUrls, setSignedUrls] = useState(null)
    const [error, setError] = useState<Error | null>(null)
    
    useEffect(() => {
        async function getPictures(id) {
            try {
                const { data, error : fetchError } = await supabase.from("galeries").select("pictures (url)").eq("id", id)
                if (fetchError){
                    throw fetchError
                }
                const refinedData = data[0].pictures
                console.log("🚀 ~ file: hooks.ts:20 ~ getPictures ~ refinedData:", refinedData)
                setPictures(refinedData)
                const urls = await fetchSignedUrls(refinedData)
                setSignedUrls(urls)

            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }


        getPictures(Number(id))
    }, [id])
       return { signedUrls, isLoading}
    }
    