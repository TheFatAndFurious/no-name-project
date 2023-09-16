import { supabase } from "../../supabase";


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

export async function getGaleries() {
    try {
        const { data, error } = await supabase.from("galeries").select("*");
        if (error) throw error;
        return data;
    } catch (error) {
        console.log(error);
    }
}

