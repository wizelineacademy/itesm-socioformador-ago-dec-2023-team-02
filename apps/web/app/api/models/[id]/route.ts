import { NextResponse } from "next/server";
import { getModelById, updateModelById, deleteModelById } from "@/lib/model";
import type { ModelUpdateData } from "@/types/model-types";

/**
 * Fetches a model by its ID.
 * @param _request - The request object.
 * @param params - An object containing the ID of the model to fetch.
 * @param params.id - The ID of the model to fetch.
 * @returns A Promise that resolves to a NextResponse object containing the fetched model as JSON with a 200 status code, or an error response with a non-200 status code and an error message.
 */
export async function GET(
    _request: Request,
    { params }: { params: { id: number } }
): Promise<NextResponse> {
    // Extract the 'id' from 'params'
    const id = params.id;
    const idModel = Number(id);

    // Call the 'getModelById' function to fetch the model by its ID
    const result = await getModelById(idModel);

    // Check the status code returned by the 'getModelById' function
    if (result.status !== 200) {
        // If the status code is not 200 (OK), return an error response
        return new NextResponse(result.message || "An error occurred", { status: result.status });
    }

    // Return the fetched model as JSON with a 200 status code
    return NextResponse.json(result.data, { status: 200 });
}

/**
 * Updates a model by its ID.
 * @param request - The HTTP request.
 * @param params - The route parameters containing the ID of the model to update.
 * @returns A Promise that resolves to a NextResponse containing the updated model as JSON with a 200 status code, or an error response with a non-200 status code if the update failed.
 */
export async function PATCH(
    request: Request,
    { params }: { params: { id: number } }
): Promise<NextResponse> {
    // Extract the 'id' from 'params'
    const id = params.id;
    const idModel = Number(id);

    // Parse the request body to get the update data
    const body = await request.text();
    const updateData: ModelUpdateData = JSON.parse(body);

    // Call the 'updateModel' function to update the model
    const result = await updateModelById(idModel, updateData);

    // Check the status code returned by the 'updateModel' function
    if (result.status !== 200) {
        // If the status code is not 200 (OK), return an error response
        return new NextResponse(result.message || "An error occurred", { status: result.status });
    }

    // Return the updated model as JSON with a 200 status code
    return NextResponse.json(result.data, { status: 200 });
}


/**
 * Deletes a model by its ID.
 * @param _request - The request object.
 * @param params - An object containing the ID of the model to be deleted.
 * @param params.id - The ID of the model to be deleted.
 * @returns A promise that resolves to a NextResponse object with a success message and a 200 status code if the model was successfully deleted, or an error message and a non-200 status code if an error occurred.
 */
export async function DELETE(
    _request: Request,
    { params }: { params: { id: number } }
): Promise<NextResponse> {
    // Extract the 'id' from 'params'
    const id = params.id;
    const idModel = Number(id);

    // Call the 'deleteModelById' function to delete the model
    const result = await deleteModelById(idModel);

    // Check the status code returned by the 'deleteModelById' function
    if (result.status !== 200) {
        // If the status code is not 200 (OK), return an error response
        return new NextResponse(result.message || "An error occurred", { status: result.status });
    }

    // Return a success message as JSON with a 200 status code
    return NextResponse.json({ message: "Model successfully deleted" }, { status: 200 });
}