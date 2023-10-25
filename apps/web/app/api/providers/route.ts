import { NextResponse } from "next/server";
import { createProvider, getAllProviders } from "@/lib/provider";
import type { ProviderCreateData } from "@/types/provider-types";

/**
 * Creates a new provider using the data provided in the request body.
 * @param {Request} request - The request object containing the provider data in the body.
 * @returns {Promise<NextResponse>} - A promise that resolves with a NextResponse object containing the created provider data or an error message.
 */
export async function POST(request: Request): Promise<NextResponse> {
  // Read the request body and convert it to text
  const body = await request.text();
  
  // Parse the text body to a JSON object of type ProviderCreateData
  const providerData: ProviderCreateData = JSON.parse(body);

  // Call the createProvider function from the lib to create a new provider in the database
  const result = await createProvider(providerData);

  // Check the status code returned by the createProvider function
  if (result.status !== 201) {
    // If the status code is not 201 (Created), return an error response
    return new NextResponse(result.message || "An error occurred", { status: result.status });
  }

  // If the provider was successfully created, return the provider data as JSON with a 201 status code
  return NextResponse.json(result.data, { status: 201 });
}

/**
 * Retrieves all providers.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object with all providers or error message.
 */
export async function GET(): Promise<NextResponse> {
  // Call the getAllProviders function from the lib to fetch all providers from the database
  const result = await getAllProviders();

  // Check the status code returned by the getAllProviders function
  if (result.status !== 200) {
    // If the status code is not 200 (OK), return an error response
    return new NextResponse(result.message || "An error occurred", { status: result.status });
  }

  // If the providers were successfully fetched, return the provider data as JSON with a 200 status code
  return NextResponse.json(result.data, { status: 200 });
}