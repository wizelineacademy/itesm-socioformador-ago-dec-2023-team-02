import { Group } from "@prisma/client";
import { NextResponse } from "next/server";
import type { PrismaResponse } from "@/types/prisma-client-types";
import { deleteGroup, getGroupById, updateGroupById } from "@/lib/group";
import { isGroupUpdateData } from "@/types/group-types";

/**
 * GET request handler, fetches a specific group. 
 * @param request - The request object.
 * @param params - The request's parameters, which contain the ID of the group to fetch. 
 * @returns A Promise that resolves to a NextResponse instance, that potentially has as body the fetched group. 
*/
export async function GET(request: Request, {params: {id}}: {params:{id: number}}): Promise<NextResponse> {
    const prismaResponse: PrismaResponse<Group> = await getGroupById(Number(id))

    if (prismaResponse.status === 200 && prismaResponse.data){
        return NextResponse.json(prismaResponse.data, {status: 200, statusText: 'OK'})
    }

    return new NextResponse(prismaResponse.message || "Unknown Error", {
        status: prismaResponse.status,
        headers: {'Content-Type': 'text/plain'}
    })
}

/**
 * DELETE request handler, deletes a specific group. 
 * @param request - The request object.
 * @param params - The request's parameters, which contain the ID of the group to delete. 
 * @returns A Promise that resolves to a NextResponse instance, potentially holding in its body the deleted group. 
*/

export async function DELETE(request: Request, {params: {id}}: {params:{id: number}}): Promise<NextResponse> {
    const prismaResponse: PrismaResponse<Group> = await deleteGroup(Number(id))

    if (prismaResponse.status === 200 && prismaResponse.data){
        return NextResponse.json(prismaResponse.data, {status: 200, statusText: 'OK'})
    }

    return new NextResponse(prismaResponse.message || "Unknown Error", {
        status: prismaResponse.status,
        headers: {'Content-Type': 'text/plain'}
    })
}

/**
 * PATCH request handler, updated a specific group. 
 * @param request - The request object.
 * @param params - The request's parameters, which contain the ID of the group to update. 
 * @returns A Promise that resolves to a NextResponse instance, potentially holding in its body the updated group. 
*/

export async function PATCH(request: Request, {params: {id}}: {params:{id: number}}): Promise<NextResponse> {
    const requestBody = await request.json()

    if (isGroupUpdateData(requestBody)){//verify that the given data object implements the updateGroupById interface
        const prismaResponse: PrismaResponse<Group> = await updateGroupById(Number(id), requestBody)
        if (prismaResponse.status === 200 && prismaResponse.data){
            return NextResponse.json(prismaResponse.data, {status: 200, statusText: 'OK'})
        }
    
        return new NextResponse(prismaResponse.message || "Unknown Error", {
            status: prismaResponse.status,
            headers: {'Content-Type': 'text/plain'}
        })
    }

    return new NextResponse("Invalid input in the request's body", {
        status: 400,
        statusText: "Bad Request",
        headers: { 'Content-Type': 'text/plain'}
    })
    
}

