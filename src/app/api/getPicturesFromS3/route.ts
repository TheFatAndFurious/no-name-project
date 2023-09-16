
import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {

    const s3Client = new S3Client({
        region: process.env.AWS_REGION
    });
    try {
        const command = new ListObjectsCommand({ 
            Bucket: process.env.AWS_BUCKET_NAME,
            EncodingType: "url"
        });
        const { Contents } = await s3Client.send(command);
        const contentList = Contents?.map((c) => c.Key) || [];

        return NextResponse.json({ success: true, files: contentList });
    } catch (error) {
        console.error("Error listing objects from S3:", error);
        return NextResponse.json({ success: false, error: "bad business logic"});
    }
 
}