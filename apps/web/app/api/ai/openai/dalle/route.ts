// route.ts OpenAi route
import type { ResponseTypes } from "openai-edge"
import { Configuration, OpenAIApi } from "openai-edge";
import { NextResponse } from "next/server";

export const runtime = 'edge';

// Stores the API key of our OpenAI model
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

/**
 * Handles POST requests to the dalle model route.
 * @param request - The incoming request object.
 * @returns A base64 string or a NextResponse object.
 */
export async function POST(request: Request): Promise<NextResponse> {
    // Destructure the incoming request to get the messages array, model, and temperature
    const {
        messages, //previous messages of chat
        size
    } = await request.json(); // {messages:[], model: '', temperature: 0.5}

    // Destructure the incoming request to get the messages array, model, and temperature
    try {
        const response: Response = await openai.createImage({
            prompt: messages[messages.length -1].content,
            response_format: 'b64_json',
            size
        });
        const data = (await response.json() as ResponseTypes["createImage"])
        const img = data.data[0].b64_json
        console.log(img)
        return NextResponse.json(img)

    } catch (error: any) {
        // If an error occurs, log it to the console and send a message to the user
        // console.error(error);
        return new NextResponse(`Error: ${error.message}`, { status: 500 });
    }
}
