import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

/**
 * Function to extract the file name of a message's content
 * @param content String containing the image in markdown format
 * @returns The file name of the image or an empty string
 */
function extractFilename(content: string): string {
    // Regular expression to match the file name in the message's content
    const regex = /\/(?<filename>[^/)]+)\)$/;

    // Executing the regex to extract the file name
    const match = regex.exec(content)?.groups;
    return match?.filename || ""
}

/**
 * Function that deletes an image from the storage bucket using it's file name.
 * @param content String containing a message's content.
 */
export async function deleteImage(content: string): Promise<NextResponse>{
    const client = new S3Client({
        credentials: {
            accessKeyId: "AKIAXNXJKBV77OB7CZPA",
            secretAccessKey: process.env.S3_SECRET_KEY,
        },
        region: "us-east-1",
    });

    // sets the storage bucket key to the file name of the image to delete
    const key: string = extractFilename(content)

    if (key === "") {
        return new NextResponse(`Error: No match was found`, {status: 400})
    }

    const command = new DeleteObjectCommand({
        Bucket: "wizeprompt",
        Key: key
    })

    // Sends the command to delete the file and logs whether the command succeeds or fails
    try {
        await client.send(command)
        return new NextResponse(`Image succesfully deleted.`, {status: 200})
    } catch(error) {
        return new NextResponse(`Failed to delete image.`, {status: 500})
    }
}