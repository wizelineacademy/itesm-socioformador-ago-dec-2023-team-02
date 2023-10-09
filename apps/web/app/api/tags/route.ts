import { NextResponse } from "next/server";
import type { Tag } from "@prisma/client";
import type { PrismaResponse } from "@/types/prisma-client-types";
import { isTagCreateData } from "@/types/tag-types";
import { createTag } from "@/lib/tag";

/**
 * POST request handler, adds the provided tag to the DB. 
 * @param request - The request object, which should hold in its body the information of the tag to add.
 * @returns A Promise that resolves to a NextResponse instance, potentially holding in its body the created tag. 
 */
export async function POST(request: Request): Promise<NextResponse> {
    const requestBody = await request.json()

    if (isTagCreateData(requestBody)){ // Verify that the given input data object implements the TagCreateData interface. 
        const prismaResponse: PrismaResponse<Tag> = await createTag(requestBody)

        if (prismaResponse.status === 200 && prismaResponse.data){
            return NextResponse.json(prismaResponse.data, {status: 200, statusText: 'OK'})
        } 

        return new NextResponse(prismaResponse.message || "Unknown Error", {
            status: prismaResponse.status, 
            headers: { 'Content-Type': 'text/plain' }
        })
    } 

    return new NextResponse("Invalid input value in the request's body", {
        status: 400, 
        statusText: "Bad Request", 
        headers: { 'Content-Type': 'text/plain' }
    })
}