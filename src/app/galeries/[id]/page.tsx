'use client'

import { getGaleries } from "@/utils/supabase"
import { useEffect, useState } from "react"
import { supabase } from "../../../../supabase"
import { getGallery, useGallery } from "@/utils/hooks/hooks"
import Wrapper from "@/app/components/Wrapper"
import DisplayGallery from "@/app/components/pictures/Gallery"
import Container from "@/app/components/Container"


export default function Page({ params }: { params : { id : string } }) {
    
    const ids =Number(params.id)
    const { signedUrls, isLoading } = useGallery(ids)
    console.log(signedUrls)

    if (isLoading) {
        return <div>Loading...</div>
    }
    
    return (
        <>
        <Container>
        <DisplayGallery>
            {signedUrls?.url?.map(url => <img src={url} loading="lazy" />)}
        </DisplayGallery>
        </Container>
        </>
    )
    }