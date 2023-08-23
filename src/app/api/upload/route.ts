import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { NextResponse } from "next/server"


export async function POST(req: Request)  {

    const formData = await req.formData()
    console.log(formData)
    const files = Array.from(formData.values());
    console.log(files)
    let uploadResults = []

    for (const file of files) {
        const fileAsBlob = file as Blob
        const buffer = Buffer.from(await fileAsBlob.arrayBuffer())
        console.log(`blob is ${fileAsBlob}`)
        const client = new S3Client({
            region: process.env.AWS_REGION })
            const command = new PutObjectCommand ({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: file?.name,
                Body: buffer
            })
            try {
                const response = await client.send(command)
                uploadResults.push({fileName: file.name, success: true})
            } catch(error) {
                console.error(error)
                uploadResults.push({fileName: file.name, success: false, errorMessage: error})
            }
        }

        const allRight = uploadResults.every(result => result.success)

        if(allRight) {
            return NextResponse.json({ success: true, results: uploadResults})
        } else {
            return NextResponse.json({ success: false, results: uploadResults})
        }


        
    }
    // let file
    // let buffer
    // for (const formDataEntryValue of formDataEntryValues) {
    //     if(typeof formDataEntryValue === "object" && "arrayBuffer" in formDataEntryValue) {
    //          file = formDataEntryValue as unknown as Blob;
    //          buffer = Buffer.from(await file.arrayBuffer())
    //          const client = new S3Client({
    //              region: process.env.AWS_REGION,
    //          })
    //             const command = new PutObjectCommand ({
    //                 Bucket: process.env.AWS_BUCKET_NAME,
    //                 Key: file?.name,
    //                 Body: buffer
    //             })
             
    //             try {
    //                 const response = await client.send(command)
    //                 return NextResponse.json({ success: true });

    //             } catch(error) {
    //                 console.error(error)
    //                 return NextResponse.json({ success: false})
    //             }
    //     }

    // }
    


