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
  
    // Destructure 'idUser' from 'params' and convert it to a Number
    const {id} = params;
    const idUser = Number(id);
  
    // Validate the user ID to make sure it's a number and greater than zero
    if (isNaN(idUser) || idUser <= 0) {
      return new NextResponse("Invalid user ID", { status: 400 });  // Return a 400 Bad Request if the ID is invalid
    }
  
    // Call the 'getAllConversationsByUserId' function to fetch all conversations for the given user ID
    const result = await getAllConversationsByUserId(idUser);
  
    // Check the status of the result
    if (result.status !== 200) {
      // If the status is not 200 OK, return an error response
      return new NextResponse(result.message || "An error occurred", { status: result.status });
    }
  
    // If everything is fine, return the conversations data as JSON
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
    { params }: { params: { userId: string } }
  ): Promise<NextResponse> {
    const userId = parseInt(params.userId, 10);
  
    // Validate userId
    if (isNaN(userId) || userId <= 0) {
      return new NextResponse("Invalid user ID", { status: 400 });
    }
  
    const result = await deactivateAllConversationsByUserId(userId);
  
    if (result.status !== 200) {
      return new NextResponse(result.message || "An error occurred", { status: result.status });
    }
  
    return NextResponse.json({ message: "Conversations marked as inactive", count: result.data?.count });
  }