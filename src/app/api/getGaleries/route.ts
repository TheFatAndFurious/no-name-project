import {  NextResponse } from "next/server";
import { supabase } from "../../../../supabase";

export async function POST(res: NextResponse){


    try {
        const { data, error } = await supabase.from("galeries_pictures").insert({id_galeries: 26, id_pictures: 1});
        NextResponse.json(data);
        } 
    catch (error) {
            console.log(error);
        }
    }