// route.ts OpenAi route
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

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
  const { messages, userContext, responseContext, temperature } =
    await request.json(); 

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
      model: "gpt-4",
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
