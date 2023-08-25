
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { NextResponse } from "next/server";

export async function POST( req: Request, ) {
    const formData = await req.json();
    console.log(formData)
    
    const s3client = new S3Client({
        region: process.env.AWS_REGION
    })

    const preSignedUrls = []

for (const element of formData.files) {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: element.name,
        ContentType: element.type
    })

    const preSignedUrl = await getSignedUrl(s3client, command, {expiresIn: 60})
    preSignedUrls.push(preSignedUrl)
}


return NextResponse.json({
"urls": preSignedUrls    
})       
}