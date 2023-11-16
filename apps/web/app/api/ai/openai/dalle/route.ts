// route.ts OpenAi route
import type { ResponseTypes } from "openai-edge";
import { Configuration, OpenAIApi } from "openai-edge";
import { NextResponse } from "next/server";
import { uploadToLightsail } from "@/lib/helper/storage/upload-image";

export const runtime = "edge";

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
  // Destructure the incoming request to get the messages array and image size
  const {
    messages, //previous messages of chat
    size, // image size
  } = await request.json(); // {messages:[], size: '256x256'}

  // Destructure the incoming request to get the messages array, model, and temperature
  try {
    /**
     * Function that uses the "createImage" tool.
     * Sets the prompt to the last message sent.
     * Sets response format to a base64.
     * Sets image size.
     */
    const response: Response = await openai.createImage({
      prompt: messages[messages.length - 1].content,
      response_format: "b64_json",
      size,
    });

    const data = (await response.json()) as ResponseTypes["createImage"];

    // Extracts the image string from the response data.
    const img: string | undefined = data.data[0].b64_json;

    // Checks that the base64 image is not undefined and uploads the image to the lightsail bucket
    // Returns the image url in markdown format
    // Otherwise returns an error message
    if (img) {
      const imageUrl: string = await uploadToLightsail(img);
      return new NextResponse(`![Generated image](${imageUrl})`, {
        status: 200,
      });
    }
    return new NextResponse(`Error: No image was generated`, { status: 500 });
  } catch (error: any) {
    // If an error occurs, log it to the console and send a message to the user
    // console.error(error);
    return new NextResponse(`Error: ${error.message}`, { status: 500 });
  }
}
