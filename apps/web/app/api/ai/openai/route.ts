//route.ts OpenAi route 
import {Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

//Tool Edge Runtime provides infraestructure for the api route
// https://edge-runtime.vercel.app/
export const runtime = 'edge'; 

// Stores the api key of our OpenAi model
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

// POST localhost:3000/api/ai/openai/route.ts
export async function POST(request: Request): Promise<StreamingTextResponse>{
    const {messages} = await request.json(); //{messages:[]}

    //messages [{users and he says "hello there"}]
    console.log(messages);

    /**Function that uses the tool "createChatCompletion"
     * This defines the type of chat model that is going to be used
     * Activate or Deactivate the use of streaming in the web app
     * Get the message response of OpenAi from "createChatCompletion"
    */
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [
            {role: "system", content: "You are a tech support and you provide a lot of software engineering solutions"},
            ...messages
        ]
    })

    /**
     * Front end section ->
     * The following functions serve to stream the messages to user
    */

    //Creates a stream of data from OpenAI using the tool "OpenAIStream" 
    const stream = OpenAIStream(response);

    //Sends the stream as a response to our user.
    return new StreamingTextResponse(stream);

}