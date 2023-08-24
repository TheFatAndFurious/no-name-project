'use client'

import React, { useState } from "react"
import CustomFileSelector from "./customFileSelector"
import ImagePreview from "./ImagePreview"
import { POST } from "@/app/api/email/route"

export default function FileUploadForm (){

    const [images, setImages] = useState<File[]>([])
    const [uploading, setUploading] = useState(false)

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const dataToCreateSignedUrl = images.map(image => ({
            name: image.name, 
            type: image.type
        }))
        console.log(dataToCreateSignedUrl)
        const res = await fetch("/api/upload", {
            method: "POST",
            body: JSON.stringify({ files: dataToCreateSignedUrl})
        })

        const formData = new FormData()
        images.forEach((image, i) => {
            return formData.append(image.name, image)
        })
        console.log(images)

        const { urls } = await res.json()
        console.log(urls)

        for (let i = 0; i < images.length; i++) {
            const sendIt = await fetch(urls[i], {
                method: "PUT",
                body: images[i]
            })

        }

        

    }
    
    function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>){
        if(e.target.files){
            const _files =Array.from(e.target.files)
            setImages(_files)
        }
    }

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex justify-between">
                <CustomFileSelector
                    accept="image/png, image/jpeg"
                    onChange={handleFileSelected} />
                    <button
                        type="submit"
                        className="text-black bg-blue-400 ">
                            Upload
                    </button>
            </div>
            <ImagePreview images={images}/>
        </form>
    )
}

