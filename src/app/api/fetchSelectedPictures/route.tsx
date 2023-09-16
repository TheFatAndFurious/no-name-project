import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {

    const body = await req.json()
    const pictures = body.pictures[0].pictures
    console.log("pictures:", pictures)

    
    const s3 = new S3Client({
        region : process.env.AWS_REGION,
    })
    let listOfUrls = []
    for(const picture of pictures) {
        try {
            const command = new GetObjectCommand({
                Bucket: process.env.AWS_BUCKET_RESIZED,
                Key: picture.url,
                ResponseContentType: "inline", 
            })
            const url = await getSignedUrl(s3, command, {expiresIn: 3600})
            listOfUrls.push(url)
        } catch (error) {
            console.error(error)
            return NextResponse.json({ success: false,  url:"fuck you" })
        }  
    }
    console.log("list of urls: ", listOfUrls)
    return NextResponse.json({ success: true,  url:listOfUrls })
}    