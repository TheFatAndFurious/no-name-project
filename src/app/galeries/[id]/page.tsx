'use client'

import { useGallery } from "@/utils/hooks/hooks"
import DisplayGallery from "@/app/components/pictures/Gallery"
import Loading from "@/app/components/Loading"


export default function Page({ params }: { params : { id : string } }) {
    
    const ids = Number(params.id)
    const { signedUrls, isLoading } = useGallery(ids)

    if (isLoading) {
        return (
            <Loading />
        )
    }
    
    return (
        <>
        <DisplayGallery>
            {signedUrls?.url?.map(url => <img src={url} key={url} loading="lazy" />)}
        </DisplayGallery>
        </>
    )
    }