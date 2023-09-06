'use client'

import React, { useEffect, useState } from "react"
import CustomFileSelector from "./customFileSelector"
import ImagePreview from "./ImagePreview"
import { supabase } from "../../../../supabase"
import { Gallery } from "@/types"
import { attributeGallery } from "@/utils/supabase"
import Wrapper from "../Wrapper"


//TODO: ADD THE OPTION TO UPLOAD A PICTURE WITHOUT CHOOSING A CATEGORY
//TODO: BETTER FEEDBACK FOR THE ADMIN

export default function FileUploadForm (){
    const [images, setImages] = useState<File[]>([])
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [galeries, setGaleries] = useState<Gallery[]>([])
    const [selectedGallery, setSelectedGallery] = useState<string | null>(null)


    useEffect(() => {
        async function getGaleries() {
            const { data } = await supabase.from('galeries').select('*')
            setGaleries(data || []) 
    }
        getGaleries()
    }, [])

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

    async function  uploadFilesToUrls(files:File[], urls:string[]){
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
        try {
            const response = await fetch("/api/insertUrlsToSupabase", {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pictures: urls})
            })

            if(!response.ok) {
                throw new Error("Failed to insert URLs to supabase")
            }

            const data = await response.json()
            return data

        } catch (error) {
            console.error(error)
            return null
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
        
        
        const picsIdsToAttributeToGaleries = await insertUrlsToSupabase(urlsToInsert)
        
        const picsIdsToInsert = picsIdsToAttributeToGaleries.data.map((picsId => Object.values(picsId)[0]))
        console.log(picsIdsToInsert)
        const test = Number(selectedGallery)
        await attributeGallery(test, picsIdsToInsert)
        

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

    function handleSelectedGallery(e: React.ChangeEvent<HTMLSelectElement>){
        setSelectedGallery(e.target.value)
    }


    return (
        <Wrapper>
            <h1 className="underline">TELEVERSEMENT DE PHOTOS</h1>
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
            <div>
                <select name="galeries" id="galeries" onChange={handleSelectedGallery}>
                    {galeries.map(gallery => (
                        <option key={gallery.id} value={gallery.id}>
                            {gallery.name}
                        </option>
                    ))}

                </select>
            </div>
        </form>
        </Wrapper>
    )
}

