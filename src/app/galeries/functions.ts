import { fetchSignedUrls, getGaleries, getGaleryCoverPics, getPictureUrlFromItsId } from "@/utils/supabase";


// FUNCTION USED TO GET ALL THE NECESSARY INFORMATIONS TO DISPLAY A GALLERY PREVIEW
export default async function constructGaleryPreview() {
    const getAllGaleries = await getGaleries();
    const coverPics = await getGaleryCoverPics();
    const urls = coverPics?.map((pic) => pic.pictures_id);
    const supabaseUrls = await getPictureUrlFromItsId(urls);
    const awsUrls = await fetchSignedUrls(supabaseUrls);
    console.log("🚀 ~ file: functions.ts:11 ~ constructGaleryPreview ~ awsUrls:", awsUrls)
    const wholeInfos = getAllGaleries?.map((item, index) => {
        return {
            id: item.id,
            name: item.name,
            // cover_pic: awsUrls[index].url,
        }})
    return wholeInfos;
}