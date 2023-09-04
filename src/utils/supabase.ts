import { supabase } from "../../supabase";


export async function attributeGallery(galery: number | null, pictures: number[]) {
    const entries = pictures.map((picture) => ({
        id_galeries: galery,
        id_pictures: picture
    }))
    console.log(entries)

    try {
        const { data } = await supabase.from("galeries_pictures").insert(entries);
        } 
    catch (error) {
            console.log(error);
        }
    }

