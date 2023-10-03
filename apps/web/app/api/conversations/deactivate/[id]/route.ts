import { NextResponse } from "next/server";
import { deactivateConversationById } from "@/lib/conversation";

/**
 * Deactivates a conversation by ID.
 * @param request - The incoming HTTP request object.
 * @param params - An object containing the 'id' of the conversation to be deactivated.
 * @returns A Promise that resolves to a NextResponse object.
 */
export async function PATCH(
    request: Request,  // The incoming HTTP request object
    { params }: { params: { id: string } }  // Destructure 'params' to get the 'id' from the URL
): Promise<NextResponse> {  // The function returns a Promise that resolves to a NextResponse object

    // Extract 'id' from 'params' and convert it to a Number
    // This is the ID of the conversation that will be deactivated
    const { id } = params;
    const idConversation = Number(id);

    // Validate the conversation ID
    // Check if the ID is a valid number and greater than zero
    if (isNaN(idConversation) || idConversation <= 0) {
        return new NextResponse("Invalid conversation ID", { status: 400 });  // Return a 400 Bad Request if the ID is invalid
    }

    // Call the 'deactivateConversationById' function to deactivate the conversation
    // 'result' will contain the status and any data or messages returned by the function
    const result = await deactivateConversationById(idConversation);

    // Check the status code of the result
    if (result.status !== 200) {
        // If the status code is not 200 OK, return an error response
        return new NextResponse(result.message || "An error occurred", { status: result.status });
    }

    // If everything is fine, return a success message as JSON
    return NextResponse.json({ message: "Conversation marked as inactive" }, { status: 200 });
}