import { NextResponse } from "next/server";
import { getConversationById, updateConversationById, deleteConversationById } from "@/lib/conversation";
import type { UpdatedInfo } from "@/lib/conversation"

/**
 * GET request handler for conversation by ID.
 * @param _request - The request object.
 * @param params - The request parameters containing the conversation ID.
 * @returns A Promise that resolves to a NextResponse object with the conversation data or an error message.
 */
export async function GET(
    _request: Request,  // The incoming HTTP request object
    { params }: { params: { id: number } }  // Destructure 'params' to get 'id' from the URL
): Promise<NextResponse> {  // The function returns a Promise that resolves to a NextResponse object

    // Extract 'id' from 'params' and convert it to a Number
    const id = params.id;
    const idConversation = Number(id);

    // Call the 'getConversationById' function to fetch the conversation by its ID
    const result = await getConversationById(idConversation);

    // Check the status code of the result
    if (result.status !== 200) {
        // If the status code is not 200 OK, return an error response
        return new NextResponse(result.message || "An error occurred", { status: result.status });
    }

    // If everything is fine, return the conversation data as JSON
    return NextResponse.json(result.data);
}

/**
 * Updates a conversation by ID.
 * @param request - The HTTP request object.
 * @param params - The route parameters containing the conversation ID.
 * @returns A Promise that resolves to a NextResponse object with the updated conversation data.
 */
export async function PATCH(
    request: Request,  // The incoming HTTP request object
    { params }: { params: { id: number } }  // Destructure 'params' to get 'id' from the URL
): Promise<NextResponse> {  // The function returns a Promise that resolves to a NextResponse object

    // Extract 'id' from 'params' and convert it to a Number
    const id = params.id;
    const idConversation = Number(id);

    // Parse the request body to get the updated information for the conversation
    const body = await request.text();
    const updatedInfo: UpdatedInfo = body ? JSON.parse(body) : {};

    // Call the 'updateConversationById' function to update the conversation in the database
    const result = await updateConversationById(idConversation, updatedInfo, true);

    // Check the status code of the result
    if (result.status !== 200) {
        // If the status code is not 200 OK, return an error response
        return new NextResponse(result.message || "An error occurred", { status: result.status });
    }

    // If everything is fine, return the updated conversation data as JSON
    return NextResponse.json(result.data);
}

/**
 * Deletes a conversation and its messages by ID.
 * @param _request - The request object.
 * @param params - An object containing the conversation ID.
 * @returns A promise that resolves to a NextResponse object with a success message or an error message and status code.
 */
export async function DELETE(
    _request: Request,  // The incoming HTTP request object (not used in this function)
    { params }: { params: { id: number } }  // Destructure 'params' to get 'id' from the URL
): Promise<NextResponse> {  // The function returns a Promise that resolves to a NextResponse object

    // Extract 'id' from 'params' and convert it to a Number
    const id = params.id;
    const idConversation = Number(id);

    // Call the 'deleteConversationById' function to delete the conversation and its messages from the database
    const result = await deleteConversationById(idConversation);

    // Check the status code of the result
    if (result.status !== 200) {
        // If the status code is not 200 OK, return an error response
        return new NextResponse(result.message || "An error occurred", { status: result.status });
    }

    // If everything is fine, return a success message as JSON
    return NextResponse.json({ message: "Conversation and messages deleted successfully" });
}