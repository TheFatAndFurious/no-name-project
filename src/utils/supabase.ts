// THOSE ARE THE FUNCTIONS USED TO INTERACT WITH SUPABASE

import { supabase } from "../../supabase";


// FUNCTION USED TO ATTRIBUTE A GALLERY TO A PICTURE, USED ON THE UPLOAD PAGE
export async function attributeGallery(galery: number | null, pictures: number[]) {
    const entries = pictures.map((picture) => ({
        galeries_id: galery,
        pictures_id: picture
    }))
    try {
        const { data } = await supabase.from("jointable").insert(entries);
        } 
    catch (error) {
            console.log(error);
        }
    }

// FUNCTION USED TO GET ALL THE GALLERIES FROM SUPABASE
export async function getGaleries() {
    try {
        const { data, error } = await supabase.from("galeries").select("*");
        if (error) throw error;
        return data;
    } catch (error) {
        console.log(error);
    }
}


// FUNCTION USED TO GET THE SUPABASE URL OF A PICTURE FROM IT'S ID
// THOSE URLS ARE THEN USED TO GET THE SIGNED URLS FROM AWS S3 
export async function getPictureUrlFromItsId(ids: number[]){
    try {
        const { data, error } = await supabase.from("pictures").select("url").in("id", ids);
        if(error) throw error;
        return data;
    } catch (error) {
        console.error(error);
    }
}


// FUNCTION USED TO GET THE SUPABASE URL OF A GALLERY COVER PICTURE
export async function getGaleryCoverPics(){
    try {
        const { data, error } = await supabase.from("jointable").select().filter("is_galery_cover_pic", "eq", true)
        if(error) throw error;
        return data
    } catch (error) {
        console.error(error);
    }
}

// FETCHING PICTURES URLS FROM AWS 
export async function fetchSignedUrls(data: [string, string]) {
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
        return result
    } else {
        console.error(result.error)
    } 
} catch (error) {
    console.error(error)
} 
}



