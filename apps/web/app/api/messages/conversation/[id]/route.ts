import { NextResponse } from "next/server";
import { getAllMessages } from "@/lib/message";

/**
 * Retrieves all messages related to a conversation by its ID.
 * @param _request - The incoming HTTP request object.
 * @param params - An object containing the 'id' parameter from the URL.
 * @param params.id - The ID of the conversation to retrieve messages for.
 * @returns A Promise that resolves to a NextResponse object containing the message data as JSON.
 */
export async function GET(
    _request: Request, // The incoming HTTP request object
    { params }: { params: { id: number } } // Destructure 'params' to get 'id' from the URL
): Promise<NextResponse> { // The function returns a Promise that resolves to a NextResponse object

    // Extract 'id' from 'params' and convert it to a Number
    const id = params.id;
    const idConversation = Number(id);

    // Call the 'getAllMessages' function to fetch all messages related to the conversation by its ID
    const result = await getAllMessages(idConversation);

    // Check the status code of the result
    if (result.status !== 200) {
        // If the status code is not 200 OK, return an error response
        return new NextResponse(result.message || "An error occurred", { status: result.status });
    }

    // If everything is fine, return the message data as JSON
    return NextResponse.json(result.data, { status: 200 });
}