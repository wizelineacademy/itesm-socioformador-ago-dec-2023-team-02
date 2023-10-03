//route.ts Route Handlers
import {Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = 'edge'; // Provide infraestructure for our API route (https://edge-runtime.vercel.ap/)

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(config);

// POST localhost:3000/api/chat
export async function POST(request: Request){
    const {messages} = await request.json(); //{messages:[]}

    //messages [{users and he says "hello there"}]
    console.log(messages);

    //GPT-4 system messages
    //system message tells GPT-4 how to act
    //it should always be at the front of your array



    //get response from openai "createChatCompletion"
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [
            {role: "system", content: "You are a tech support and you provide a lot of software engineering solutions"},
            ...messages
        ]
    })

    //create a stream of data from OpenAI (stream data to the frontend)
    const stream = await OpenAIStream(response);

    //send the stream as a response to our client / frontend
    return new StreamingTextResponse(stream);

}