import { supabase } from "../../supabase";


export async function attributeGallery(galery: number | null, pictures: number[]) {
    const entries = pictures.map((picture) => ({
        id_galeries: galery,
        id_pictures: picture
    }))

    try {
        const { data } = await supabase.from("galeries_pictures").insert(entries);
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

