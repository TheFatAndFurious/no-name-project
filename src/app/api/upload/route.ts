import { NextResponse } from "next/server";
import * as ftp from "basic-ftp"
import { Readable } from "node:stream";


export async function POST(req: Request) {
    const formData = await req.formData();
    const formDataEntryValues = Array.from(formData.values());
    const files: { name: string, buffer: Buffer }[] = [];

    for (const formDataEntryValue of formDataEntryValues) {
        if (typeof formDataEntryValue === 'object' && 'arrayBuffer' in formDataEntryValue) {
            const file = formDataEntryValue as unknown as Blob;
            const buffer = Buffer.from(await file.arrayBuffer());
            files.push({ name: file.name, buffer });
        }
    }


    example()


    async function example(){
        const client = new ftp.Client()
        client.ftp.verbose = true
        try {
            await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            secure: false
            })

    for (const file of files) {
        const readableStream = new Readable({
            read() {
                this.push(file.buffer);
                this.push(null); // End the stream after pushing the buffer
            }
        });
        
        await client.uploadFrom(readableStream, `/domains/baroshilabs.com/public_html/images/${file.name}`);
    }
        }
        catch(err){
            console.log(err)
        }
        client.close()
    }
}