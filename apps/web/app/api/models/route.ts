import { NextResponse } from "next/server";
import { getAllModels, createModel } from "@/lib/model";
import type { ModelCreateData } from "@/types/model-types";

/**
 * Fetches all models from the database using the 'getAllModels' function.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the fetched models as JSON with a 200 status code, or an error response with a non-200 status code and an error message.
 */
export async function GET(): Promise<NextResponse> {
    // Call the 'getAllModels' function to fetch all models from the database
    const result = await getAllModels();

    // Check the status code returned by the 'getAllModels' function
    if (result.status !== 200) {
        // If the status code is not 200 (OK), return an error response
        return new NextResponse(result.message || "An error occurred", { status: result.status });
    }

    // Return the fetched models as JSON with a 200 status code
    return NextResponse.json(result.data, { status: 200 });
}

/**
 * Creates a new model using the provided data in the request body.
 * @param {Request} request - The HTTP request object.
 * @returns {Promise<NextResponse>} A promise that resolves with a NextResponse object containing the created model as JSON and a 201 status code, or an error response with a message and status code if the creation fails.
 */
export async function POST(request: Request): Promise<NextResponse> {
    // Parse the request body to get the model data
    const body = await request.text();
    const modelData: ModelCreateData = JSON.parse(body);

    // Call the 'createModel' function to create the new model
    const result = await createModel(modelData);

    // Check the status code returned by the 'createModel' function
    if (result.status !== 201) {
        // If the status code is not 201 (Created), return an error response
        return new NextResponse(result.message || "An error occurred", { status: result.status });
    }

    // Return the created model as JSON with a 201 status code
    return NextResponse.json(result.data, { status: 201 });
}