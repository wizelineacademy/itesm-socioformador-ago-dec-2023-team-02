import { NextResponse } from "next/server";
import { createMessage } from "@/lib/message";
import type { MessageDataInput } from "@/lib/message"

/**
 * Creates a new message in the database.
 * @param {Request} request - The request object.
 * @returns {Promise<NextResponse>} - A promise that resolves to a NextResponse object.
 */
export async function POST(
    request: Request): Promise<NextResponse> {

    // Parse the request body to get the message data
    const input: MessageDataInput = await JSON.parse(await request.text());

    // Call the 'createMessage' function to create a new message in the database
    const result = await createMessage(input);

    // Check the status code of the result
    if (result.status !== 201) {  // Changed from 200 to 201 to match Prisma method
        return new NextResponse(result.message || "An error occurred", { status: result.status });
    }

    // If everything is fine, return the message data as JSON
    return NextResponse.json(result.data, { status: 200 });
}