import type { Group } from "@prisma/client"
import { NextResponse } from "next/server"
import type { PrismaResponse } from "@/types/prisma-client-types"
import { createGroup, getAllGroups } from "@/lib/group"
import { isGroupCreateData } from "@/types/group-types"

/** 
 *  GET request handler, fetches all users.
 * @returns a Promisa that resolves to a NextResponse instance which potencially has as body an array containing all users.
*/

export async function GET(): Promise<NextResponse> {
    const prismaResponse: PrismaResponse<Group[]> = await getAllGroups()

    if (prismaResponse.status === 200 && prismaResponse.data){
        return NextResponse.json(prismaResponse.data, {status: 200, statusText: 'OK'})
    }

    return new NextResponse(prismaResponse.message || "Unknown Error", {
        status: prismaResponse.status,
        headers: {'Content-Type': 'text/plain'}
    })
}

/**
 * POST request handler, adds the provided user to the DB. 
 * @param request - The request object, which should hold in its body the information of the group to add.
 * @returns A Promise that resolves to a NextResponse instance, potentially holding in its body the created group. 
*/
export async function POST(request: Request): Promise<NextResponse> {
    const requestBody = await request.json()

    if (isGroupCreateData(requestBody)) {
        const prismaResponse: PrismaResponse<Group> = await createGroup(requestBody)

        if (prismaResponse.status === 200 && prismaResponse.data){
            return NextResponse.json(prismaResponse.data, {status: 200, statusText: "OK"})
        }

        return new NextResponse(prismaResponse.message || "Unknown Error", {
            status: prismaResponse.status,
            headers: { 'Content-Type': 'text/plain'}
        })
    }

    return new NextResponse("Invalid input value in the request's body", {
        status: 400,
        statusText: 'Bad Request',
        headers: { 'Content-Type': 'text/plain'}
    })
}