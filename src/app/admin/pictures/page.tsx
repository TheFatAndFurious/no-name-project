// import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";

// export default async function displayPictures () {
//     const s3Client = new S3Client({});

//     async function listFilesInBucket(bucketName) {

//         const command = new ListObjectsCommand({ Bucket: bucketName});
//         const { Contents } = await s3Client.send(command);
//         return Contents

//     }
//     const bucketContents = await listFilesInBucket(process.env.AWS_BUCKET_NAME)
//     console.log(bucketContents);

//     return (
//         <div>
//             {bucketContents.map((picture) => {
//                 <li key={picture.ETag}>{picture.Key}</li>
//             })}
//         </div>
//     )

