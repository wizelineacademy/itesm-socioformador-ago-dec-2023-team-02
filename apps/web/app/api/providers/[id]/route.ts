import { NextResponse } from "next/server";
import { getProviderById, updateProvider, deleteProvider } from "@/lib/provider";
import type { ProviderUpdateData } from "@/types/provider-types";

/**
 * Retrieves a provider by its ID.
 * @param _request - The request object.
 * @param params - The parameters object containing the provider ID.
 * @returns A Promise that resolves to a NextResponse object with the provider data or an error message.
 */
export async function GET(
  _request: Request,  // The incoming HTTP request object (not used in this function)
  { params }: { params: { id: number } }  // Destructure 'params' to get 'id' from the URL
): Promise<NextResponse> {  // The function returns a Promise that resolves to a NextResponse object

  // Extract the 'id' from 'params'
  const id = params.id;
  const idProvider = Number(id);

  // Call the 'getProviderById' function from the lib to fetch the provider with the given ID from the database
  const result = await getProviderById(idProvider);

  // Check the status code returned by the 'getProviderById' function
  if (result.status !== 200) {
    // If the status code is not 200 (OK), return an error response
    return new NextResponse(result.message || "An error occurred", { status: result.status });
  }

  // If the provider was successfully fetched, return the provider data as JSON with a 200 status code
  return NextResponse.json(result.data, { status: 200 });
}

/**
 * Updates a provider with the given ID using the data provided in the request body.
 * @param request - The incoming request object.
 * @param params - An object containing the ID of the provider to update.
 * @returns A Promise that resolves with a NextResponse object containing the updated provider data.
 */
export async function PATCH(
  request: Request,  // The incoming HTTP request object
  { params }: { params: { id: number } }  // Destructure 'params' to get 'id' from the URL
): Promise<NextResponse> {  // The function returns a Promise that resolves to a NextResponse object

  // Extract the 'id' from 'params'
  const id = params.id;
  const idProvider = Number(id);


  // Parse the request body to get the updated data for the provider
  const body = await request.text();
  const updateData: ProviderUpdateData = JSON.parse(body);

  // Call the 'updateProvider' function from the lib to update the provider with the given ID and data
  const result = await updateProvider(idProvider, updateData);

  // Check the status code returned by the 'updateProvider' function
  if (result.status !== 200) {
    // If the status code is not 200 (OK), return an error response
    return new NextResponse(result.message || "An error occurred", { status: result.status });
  }

  // If the provider was successfully updated, return the updated provider data as JSON with a 200 status code
  return NextResponse.json(result.data, { status: 200 });
}

/**
 * Deletes a provider with the given ID.
 * @param _request - The request object.
 * @param params - An object containing the provider ID.
 * @param params.id - The ID of the provider to delete.
 * @returns A Promise that resolves to a NextResponse object.
 */
export async function DELETE(
  _request: Request,  // The incoming HTTP request object (not used in this function, hence the underscore)
  { params }: { params: { id: number } }  // Destructure 'params' to get 'id' from the URL
): Promise<NextResponse> {  // The function returns a Promise that resolves to a NextResponse object

  // Extract the 'id' from 'params'
  const id = params.id;
  const idProvider = Number(id);

  // Call the 'deleteProvider' function from the lib to delete the provider with the given ID
  const result = await deleteProvider(idProvider);

  // Check the status code returned by the 'deleteProvider' function
  if (result.status !== 200) {
    // If the status code is not 200 (OK), return an error response
    return new NextResponse(result.message || "An error occurred", { status: result.status });
  }

  // If the provider was successfully deleted, return a success message as JSON with a 200 status code
  return NextResponse.json({ message: "Provider successfully deleted" }, { status: 200 });
}