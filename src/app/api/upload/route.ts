import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { NextResponse } from "next/server"




export async function POST(req: Request)  {
    const formData = await req.formData()
    const formDataEntryValues = Array.from(formData.values());
    let file
    let buffer
    for (const formDataEntryValue of formDataEntryValues) {
        if(typeof formDataEntryValue === "object" && "arrayBuffer" in formDataEntryValue) {
             file = formDataEntryValue as unknown as Blob;
             buffer = Buffer.from(await file.arrayBuffer())
        }

    }
    
    const client = new S3Client({
        region: process.env.AWS_REGION,
    })
       const command = new PutObjectCommand ({
           Bucket: process.env.AWS_BUCKET_NAME,
           Key: file?.name,
           Body: buffer
       })
    
       try {
           const response = await client.send(command)
           console.log(response)
       } catch(error) {
           console.error(error)
       }

    return NextResponse.json({ success: true });
}
