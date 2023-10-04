import type { User } from "@prisma/client";
import { NextResponse } from "next/server";
import type { PrismaResponse } from "@/types/prisma-client-types";
import { deleteUser, getUser, updateUser } from "@/lib/user";
import { isUserUpdateData } from "@/types/user-types";


/**
 * GET request handler, fetches a specific user. 
 * @param request - The request object.
 * @param params - The request's parameters, which contain the ID of the user to fetch. 
 * @returns A Promise that resolves to a NextResponse instance, that potentially has as body the fetched user. 
 */
export async function GET(request: Request, {params: {id}}: {params: {id: number}}): Promise<NextResponse> {
    const prismaResponse: PrismaResponse<User> = await getUser(Number(id))

    if (prismaResponse.status === 200 && prismaResponse.data){
        return NextResponse.json(prismaResponse.data, {status: 200, statusText: 'OK'})
    } 

    return new NextResponse(prismaResponse.message || "Unknown Error", {
        status: prismaResponse.status, 
        headers: { 'Content-Type': 'text/plain' }
    })
}

/**
 * DELETE request handler, deletes a specific user. 
 * @param request - The request object.
 * @param params - The request's parameters, which contain the ID of the user to delete. 
 * @returns A Promise that resolves to a NextResponse instance, potentially holding in its body the deleted user. 
 */
export async function DELETE(request: Request, {params: {id}}: {params: {id: number}}): Promise<NextResponse> {
    const prismaResponse: PrismaResponse<User> = await deleteUser(Number(id))

    if (prismaResponse.status === 200 && prismaResponse.data){
        return NextResponse.json(prismaResponse.data, {status: 200, statusText: 'OK'})
    } 

    return new NextResponse(prismaResponse.message || "Unknown Error", {
        status: prismaResponse.status, 
        headers: { 'Content-Type': 'text/plain' }
    })
}

/**
 * PATCH request handler, updated a specific user. 
 * @param request - The request object.
 * @param params - The request's parameters, which contain the ID of the user to update. 
 * @returns A Promise that resolves to a NextResponse instance, potentially holding in its body the updated user. 
 */
export async function PATCH(request: Request, {params: {id}}: {params: {id: number}}): Promise<NextResponse> {
    const requestBody = await request.json()

    if (isUserUpdateData(requestBody)){ // Verify that the given input data object implements the UserUpdateData interface. 
        const prismaResponse: PrismaResponse<User> = await updateUser(Number(id), requestBody)

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