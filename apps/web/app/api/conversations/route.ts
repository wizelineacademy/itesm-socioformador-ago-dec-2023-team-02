import { NextResponse } from "next/server";
import {createConversation} from "@/lib/conversation";
import type { ConversationCreateData } from "@/types/conversation-types";

/**
 * Handles POST requests to create a new conversation.
 * @param request - The incoming request object.
 * @returns A Promise that resolves to a NextResponse object.
 */
export async function POST(
request: Request  // The incoming HTTP request object
): Promise<NextResponse> {  // The function returns a Promise that resolves to a NextResponse object

  // Parse the request body to get the conversation data input
  const input: ConversationCreateData = JSON.parse(await request.text());

  // Call the 'createConversation' function to create a new conversation in the database
  const result = await createConversation(input);

  // Check the status code of the result
  if (result.status !== 201) {
    // If the status code is not 201 (Created), return an error response
    return new NextResponse(result.message || "An error occurred", { status: result.status });
  }

  // If the conversation was successfully created, return the new conversation data as JSON
  return NextResponse.json(result.data, { status: 201 });
}