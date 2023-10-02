import { NextResponse } from "next/server";
import { getAllConversationsByUserId, deactivateAllConversationsByUserId } from "@/lib/conversation";

/**
 * Retrieves all conversations for a given user ID.
 * @param request - The incoming request object.
 * @param params - An object containing the user ID as a string.
 * @returns A Promise that resolves to a NextResponse object containing the conversations data or an error message.
 */
export async function GET(
    request: Request,  // The incoming HTTP request object
    { params }: { params: { id: number } }  // Destructure 'params' to get 'idUser' from the URL
): Promise<NextResponse> {  // The function returns a Promise that resolves to a NextResponse object

    // Destructure 'id' from 'params' and convert it to a Number
    // This is the ID of the user whose conversations we want to fetch
    const { id } = params;
    const idUser = Number(id);

    // Validate the user ID to make sure it's a number and greater than zero
    // If the ID is invalid, return a 400 Bad Request response
    if (isNaN(idUser) || idUser <= 0) {
        return new NextResponse("Invalid user ID", { status: 400 });
    }

    // Call the 'getAllConversationsByUserId' function to fetch all conversations for the given user ID
    // The 'result' will contain the status and any data or messages returned by the function
    const result = await getAllConversationsByUserId(idUser);

    // Check the status of the result
    // If the status is not 200 OK, return an error response
    if (result.status !== 200) {
        return new NextResponse(result.message || "An error occurred", { status: result.status });
    }

    // If everything is fine, return the conversations data as JSON
    // This will be the successful outcome of the API call
    return NextResponse.json(result.data);
}


/**
 * Deactivates all conversations for a given user ID.
 * @param request - The incoming request object.
 * @param params - An object containing the user ID as a string.
 * @returns A Promise that resolves to a NextResponse object.
 */
export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    // Destructure 'id' from 'params' and convert it to a Number
    // This is the ID of the user whose conversations will be deactivated
    const { id } = params;
    const idUser = Number(id);

    // Validate userId
    // Check if the user ID is a valid number and greater than zero
    if (isNaN(idUser) || idUser <= 0) {
        return new NextResponse("Invalid user ID", { status: 400 });
    }

    // Call the function to deactivate all conversations for the given user ID
    // 'result' will contain the status and any data or messages returned by the function
    const result = await deactivateAllConversationsByUserId(idUser);

    // Check the status of the operation
    // If the status is not 200, return an error response
    if (result.status !== 200) {
        return new NextResponse(result.message || "An error occurred", { status: result.status });
    }

    // If everything went well, return a success response
    // The response will include a message and the count of conversations that were deactivated
    return NextResponse.json({ message: "Conversations marked as inactive", count: result.data?.count });
}