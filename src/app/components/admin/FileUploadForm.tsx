'use client'

import React, { useState } from "react"
import CustomFileSelector from "./customFileSelector"
import ImagePreview from "./ImagePreview"


export default function FileUploadForm (){
    const [images, setImages] = useState<File[]>([])
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    async function getPreSignedUrls( files: { name: string, type: string}[]) {
        const response = await fetch("/api/getPreSignedUrls", {
            method: "POST", 
            body: JSON.stringify({ files })
        });

        if(!response.ok) {
            throw new Error("Failed to get pre-signed URLs")
        }

        return response.json()
    }

    async function uploadFilesToUrls(files:File[], urls:string[]){
        const urlsToInsertInto: { url: string }[] = []

        for(let i = 0; i < files.length; i++) {
            const response = await fetch(urls[i], {
                method: "PUT",
                body: files[i],
            })

            if(!response.ok) {
                throw new Error(`Failed to upload image ${i + 1}`)
            } else {
                urlsToInsertInto.push({ url: files[i].name})
            }
        }
        return urlsToInsertInto;
    }

    async function insertUrlsToSupabase(urls: { url: string}[]) {
        const response = await fetch("/api/insertUrlsToSupabase", {
            method: "POST", 
            body: JSON.stringify({ pictures: urls})
        })

        if (!response.ok) {
            throw new Error("Failed to insert URLs to Supabase")
        }
    }


    async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setUploading(true)
        setError(null)

        try {
            const dataToCreateSignedUrl = images.map(image => ({
            name: image.name, 
            type: image.type
        }))

        const { urls } = await getPreSignedUrls(dataToCreateSignedUrl)
        const urlsToInsert = await uploadFilesToUrls(images, urls)
        await insertUrlsToSupabase(urlsToInsert)

        alert("Upload successful !")
        } catch (error) {
            console.error(error)
            setError("an error occured during upload")
        } finally {
            setUploading(false)
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
                        disabled={uploading}
                        type="submit"
                        className={`text-black bg-blue-400 ${uploading ? "bg-gray-300 cursor-not-allowed" : ""}`}>
                            Upload
                    </button>
            </div>
            <ImagePreview images={images}/>
        </form>
    )
}

