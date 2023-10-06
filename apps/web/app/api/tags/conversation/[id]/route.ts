import { NextResponse } from "next/server"
import type { Tag } from "@prisma/client"
import { getAllTagsByConversationID } from "@/lib/tag"
import type { PrismaResponse } from "@/types/prisma-client-types"

/**
 * GET request handler, fetches all tags belonging to the specified conversation. 
 * @param request - The request object.
 * @param params - The request's parameters, which contain the ID of the conversation whose tags will be fetched. 
 * @returns A Promise that resolves to a NextResponse instance, that potentially has as body the fetched tag array. 
 */
export async function GET(request: Request, {params: {id}}: {params: {id: number}}): Promise<NextResponse> {
    const prismaResponse: PrismaResponse<Tag[]> = await getAllTagsByConversationID(Number(id))

    if (prismaResponse.status === 200 && prismaResponse.data){
        return NextResponse.json(prismaResponse.data, {status: 200, statusText: 'OK'})
    } 

    return new NextResponse(prismaResponse.message || "Unknown Error", {
        status: prismaResponse.status, 
        headers: { 'Content-Type': 'text/plain' }
    })
}