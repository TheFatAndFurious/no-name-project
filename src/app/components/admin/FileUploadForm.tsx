'use client'

import React, { useState } from "react"
import CustomFileSelector from "./customFileSelector"
import ImagePreview from "./ImagePreview"
import axios from "axios"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function FileUploadForm (){

    const [images, setImages] = useState<File[]>([])
    const [uploading, setUploading] = useState(false)

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData();
        images.forEach((image, i) => {
            formData.append(image.name, image)
        })
        console.log(formData.values())
        setUploading(true)
        await fetch("/api/upload", {
            method: "POST",
            body: formData})
        setUploading(false)
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