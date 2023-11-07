import { NextResponse } from "next/server"
import type { Tag } from "@prisma/client"
import { deleteTag, updateTag } from "@/lib/tag"
import type { PrismaResponse } from "@/types/prisma-client-types"
import { isTagUpdateData } from "@/types/tag-types"

/**
 * DELETE request handler, deletes a specific tag. 
 * @param request - The request object.
 * @param params - The request's parameters, which contain the ID of the tag to delete. 
 * @returns A Promise that resolves to a NextResponse instance, potentially holding in its body the deleted tag. 
 */
export async function DELETE(request: Request, {params: {id}}: {params: {id: number}}): Promise<NextResponse> {
    const prismaResponse: PrismaResponse<Tag> = await deleteTag(Number(id))

    if (prismaResponse.status === 200 && prismaResponse.data){
        return NextResponse.json(prismaResponse.data, {status: 200, statusText: 'OK'})
    } 

    return new NextResponse(prismaResponse.message || "Unknown Error", {
        status: prismaResponse.status, 
        headers: { 'Content-Type': 'text/plain' }
    })
}

/**
 * PATCH request handler, updated a specific tag. 
 * @param request - The request object.
 * @param params - The request's parameters, which contain the ID of the tag to update. 
 * @returns A Promise that resolves to a NextResponse instance, potentially holding in its body the updated tag. 
 */
export async function PATCH(request: Request, {params: {id}}: {params: {id: number}}): Promise<NextResponse> {
    const requestBody = await request.json()

    if (isTagUpdateData(requestBody)){ // Verify that the given input data object implements the TagUpdateData interface. 
        const prismaResponse: PrismaResponse<Tag> = await updateTag(Number(id), requestBody)

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