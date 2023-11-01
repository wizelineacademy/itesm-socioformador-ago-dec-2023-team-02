// route.ts OpenAi route
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
/*
import { getConversationById } from "@/lib/conversation";
import { Conversation } from "@prisma/client";
import { JsonObject, JsonValue } from "@prisma/client/runtime/library";
*/

export const runtime = 'edge';

/*
interface Parameters {
    userContext: string;
    responseContext: string;
    temperature: number;
  }
*/
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
export async function POST(request: Request): Promise<StreamingTextResponse | NextResponse> {
    // Destructure the incoming request to get the messages array, model, and temperature    
    const {messages, id, userContext, responseContext, temperature} = await request.json(); // {messages:[], model: '', temperature: 0.5}
    const idConversation = Number(id);
    const temp = Number(temperature);
    /*
    try{

        console.log(idConversation);
        console.log(userContext);
        console.log(responseContext);
        console.log(temp);


        console.log("DENTRO");


        const response = await getConversationById(messages[0].conversationId);
        const data = response.data;
        
        const parameters: Parameters | undefined = data.parameters;

        const conversation: Conversation = data;


        console.log("userContext: ", userContext);
        console.log("responseContext: ", responseContext);
        console.log("temperature: ", temperature);

    }catch(error: any){
        
        return new NextResponse(`Error: ${error.message}`, { status: 500 });
    }
    */
    
    
    let customInstructions = ""; //custom instructions of chat

    if(userContext !== ""){
        customInstructions += `Context of the user: ${userContext}. `;
    }
    if(userContext !== ""){
        customInstructions += `This is how you should respond: ${responseContext}. `;
    }
    


    try {
        /**
         * Function that utilizes the tool "createChatCompletion".
         * This defines the type of chat model that is going to be used.
         * Activate or deactivate the use of streaming in the web app.
         * Get the message response from OpenAI using "createChatCompletion".
         */
        console.log("DENTRO");
        console.log("customInstructions: ", customInstructions);
        console.log("temperature: ", temp);
        console.log("id: ", idConversation);
        console.log("FUERA");
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            stream: true,  // Enable streaming
            temperature: temp,  // Set temperature, default is 0.5 if not provided
            messages: [
                {role: "system", content: customInstructions},
                ...messages
            ],
        });
        
        // Creates a stream of data from OpenAI using the tool "OpenAIStream"
        const stream = OpenAIStream(response);

        // Sends the stream as a response to our user.
        return new StreamingTextResponse(stream, { status: 200});

    } catch (error: any) {
        // If an error occurs, log it to the console and send a message to the user
        // console.error(error);
        return new NextResponse(`Error: ${error.message}`, { status: 500 });
    }
}
