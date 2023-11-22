import { NextResponse } from "next/server"
import { modifyGroupsCurrentCredits } from "@/lib/group"
import type { PrismaResponse } from "@/types/prisma-client-types"

export async function PATCH(request: Request, {params: {id}}: {params: {id: number}}): Promise<NextResponse> {
    const requestBody = await request.json()

    if (requestBody?.creditOffset){ 
        const prismaResponse: PrismaResponse<{count: number}> = await modifyGroupsCurrentCredits(Number(id), Number(requestBody?.creditOffset))

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