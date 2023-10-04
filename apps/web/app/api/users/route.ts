import type { User } from "@prisma/client"
import { NextResponse } from "next/server"
import type { PrismaResponse } from "@/types/prisma-client-types"
import { createUser, getAllUsers } from "@/lib/user"
import { isUserCreateData } from "@/types/user-types"


/**
 * GET request handler, fetches all users. 
 * @returns A Promise that resolves to a NextResponse instance which potentially has as body an array containing all users. 
 */
export async function GET(): Promise<NextResponse> {
    const prismaResponse: PrismaResponse<User[]> = await getAllUsers()

    if (prismaResponse.status === 200 && prismaResponse.data){
        return NextResponse.json(prismaResponse.data, {status: 200, statusText: 'OK'})
    } 

    return new NextResponse(prismaResponse.message || "Unknown Error", {
        status: prismaResponse.status, 
        headers: { 'Content-Type': 'text/plain' }
    })
}

/**
 * POST request handler, adds the provided user to the DB. 
 * @param request - The request object, which should hold in its body the information of the user to add.
 * @returns A Promise that resolves to a NextResponse instance, potentially holding in its body the created user. 
 */
export async function POST(request: Request): Promise<NextResponse> {
    const requestBody = await request.json()

    if (isUserCreateData(requestBody)){ // Verify that the given input data object implements the UserCreateData interface. 
        const prismaResponse: PrismaResponse<User> = await createUser(requestBody)

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