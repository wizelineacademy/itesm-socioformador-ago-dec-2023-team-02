import { NextResponse } from "next/server";
import { getMessage, deleteMessage } from "@/lib/message";

/**
 * Retrieves a message by its ID.
 * @param _request - The incoming request object.
 * @param params - An object containing the message ID.
 * @param params.id - The ID of the message to retrieve.
 * @returns A Promise that resolves to a NextResponse object containing the retrieved message or an error message.
 */
export async function GET(
    _request: Request,
    { params }: { params: { id: number } }
): Promise<NextResponse> {

    // Extract 'id' from 'params' and convert it to a Number
    const id = params.id;
    const idMessage = Number(id);

    //Call the 'getMessage' function to fetch the message by its ID
    const result = await getMessage(idMessage);

    //Check the status code of the result
    if (result.status !== 200) {
        // If the status code is not 200 OK, return an error response
        return new NextResponse(result.message || "An error occurred", { status: result.status });
    }

    // If everything is fine, return the message data as JSON
    return NextResponse.json(result.data, { status: 200 });
}


/**
 * Deletes a message by its ID.
 * @param {Request} _request - The request object.
 * @param {Object} params - The parameters object.
 * @param {number} params.id - The ID of the message to delete.
 * @returns {Promise<NextResponse>} A promise that resolves with a NextResponse object.
 */
export async function DELETE(
    _request: Request,
    { params }: { params: { id: number } }
): Promise<NextResponse> {

    // Extract 'id' from 'params' and convert it to a Number
    const id = params.id;
    const idMessage = Number(id);

    // Call the 'deleteMessage' function to delete the message by its ID
    const result = await deleteMessage(idMessage);

    // Check the status code of the result
    if (result.status !== 200) {
        // If the status code is not 200 OK, return an error response
        return new NextResponse(result.message || "An error occurred", { status: result.status });
    }

    // If everything is fine, return the message data as JSON
    return NextResponse.json({message: result.message}, { status: 200 });
}