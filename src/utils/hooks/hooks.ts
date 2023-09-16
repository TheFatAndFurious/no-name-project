import { Gallery } from "@/types";
import { useEffect, useState } from "react";
import { getGaleries } from "../supabase";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { supabase } from "../../../supabase";

 
// Getting urls references from a specific gallery 
export function useGallery(id: number) {
    const [pictures, setPictures] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [signedUrls, setSignedUrls] = useState(null)

    useEffect(() => {
        async function getPictures(id) {
            try {
                const { data, error } = await supabase.from("galeries").select("pictures (url)").eq("id", id)
                setPictures(data)
                fetchSignedUrls(data)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        async function fetchSignedUrls(data) {
            try{
                const response = await fetch('/api/fetchSelectedPictures', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        pictures: data,
                })
            })
            const result = await response.json()
            if(result.success) {
                setSignedUrls(result)
                console.log("blah is => ", signedUrls)
            } else {
                console.error(result.error)
            } 
        } catch (error) {
            console.error(error)
        } 
    }
        getPictures(Number(id))
    }, [id])
       return { signedUrls, isLoading}
    }
    