import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    
    const s3 = new S3Client({
        region : process.env.AWS_REGION,
    })

    try {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: "antoine.jpg",
            ResponseContentType: "inline", 
        })
        const url = await getSignedUrl(s3, command, {expiresIn: 3600})
        console.log(url)
        return NextResponse.json({ success: true, url: url })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false,  url:"fuck you" })
    }  
}