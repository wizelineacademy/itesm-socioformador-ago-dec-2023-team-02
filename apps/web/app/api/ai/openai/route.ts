// route.ts OpenAi route
import { Configuration, OpenAIApi, type ResponseTypes } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import { uploadToLightsail } from "@/lib/helper/storage/upload-image";

export const runtime = 'edge';


// Stores the API key of our OpenAI model
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

/**
 * Handles POST requests to the chat-gpt route.
 * @param request - The incoming request object.
 * @returns A StreamingTextResponse or NextResponse object.
 */
export async function POST(
  request: Request
): Promise<StreamingTextResponse | NextResponse> {
  // Destructure the incoming request to get the messages array, model, and temperature
  const { messages, userContext, responseContext, temperature, modelName, size } =
    await request.json(); 

  if (modelName === "dalle") {
    try {
      /**
       * Function that uses the "createImage" tool.
       * Sets the prompt to the last message sent.
       * Sets response format to a base64.
       * Sets image size.
       */
      const response: Response = await openai.createImage({
          prompt: messages[messages.length - 1].content,
          response_format: 'b64_json',
          size
      });

      const data = (await response.json() as ResponseTypes["createImage"])

      // Extracts the image string from the response data.
      const img: string | undefined = data.data[0].b64_json

      // Checks that the base64 image is not undefined and uploads the image to the lightsail bucket
      // Returns the image url in markdown format
      // Otherwise returns an error message
      if (img) {
        const imageUrl: string = await uploadToLightsail(img)
        return new NextResponse(`![Generated image](${imageUrl})`, {status: 200})
      } else {
        return new NextResponse(`Error: No image was generated`, { status: 500 });
      }
    } catch (error: any) {
      // If an error occurs, log it to the console and send a message to the user
      // console.error(error);
      return new NextResponse(`Error: ${error.message}`, { status: 500 });
    }
  } else {
    try {
      //temperature
      const temp = Number(temperature); //temperature of chat
      //construct Custom Instructions
      let customInstructions = ""; //custom instructions of chat
  
      if (responseContext !== "") {
        customInstructions += `How you should respond: ${responseContext}. `;
      }
  
      if (userContext !== "") {
        customInstructions += `User context: ${userContext}. `;
      }
  
      /**
       * Function that utilizes the tool "createChatCompletion".
       * This defines the type of chat model that is going to be used.
       * Activate or deactivate the use of streaming in the web app.
       * Get the message response from OpenAI using "createChatCompletion".
       */
      const response = await openai.createChatCompletion({
        model: modelName,
        stream: true, // Enable streaming
        temperature: temp, // Set temperature, default is 0.5 if not provided
        messages: [{ "role": "system", "content": customInstructions }, ...messages],
      });
  
      // Creates a stream of data from OpenAI using the tool "OpenAIStream"
      const stream = OpenAIStream(response);
  
      // Sends the stream as a response to our user.
      return new StreamingTextResponse(stream, { status: 200 });

    } catch (error: any) {
      // If an error occurs, log it to the console and send a message to the user
      // console.error(error);
      return new NextResponse(`Error: ${error.message}`, { status: 500 });
    }
  }
}
