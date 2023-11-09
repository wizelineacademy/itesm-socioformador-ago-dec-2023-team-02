import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 } from "uuid";

const domain = "https://wizeprompt.s3.us-east-1.amazonaws.com/"

/**
 * Function that creates an image file from a base64 string and uploads that image to a storage bucket.
 * @param base64 A base64 string containing the image to upload.
 * @returns A string containing the image's URL representing it's location in the storage bucket.
 */
export async function uploadToLightsail(base64: string): Promise<any> {
    const client = new S3Client({
        credentials: {
            accessKeyId: "AKIAXNXJKBV77OB7CZPA",
            secretAccessKey: process.env.S3_SECRET_KEY,
        },
        region: "us-east-1",
    });

    // Decode base64 string to binary data
    const binaryData = Buffer.from(base64, 'base64');

    // Generate a unique name for the uploaded image
    const filename = v4() + ".png"

    // Define the storage bucket, filename and data that will be stored
    const command = new PutObjectCommand({
        Bucket: "wizeprompt",
        Key: filename, // Name for the uploaded image
        Body: binaryData,
        ContentType: 'image/png',
        ACL: "public-read"
    });

    // upload the file to the s3 bucket and return the location url
    try {
        const response = await client.send(command);
        console.log(response)
        return (`${domain}${filename}`)
    } 
    catch(err) {
        console.error(err);
    }
}