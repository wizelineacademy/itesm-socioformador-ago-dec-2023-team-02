import type { User } from "@prisma/client";
import { NextResponse } from "next/server";
import { decrementUserCreditsRemaining } from "@/lib/user";
import type { PrismaResponse } from "@/types/prisma-client-types";

export async function PATCH(request: Request, {params: {id}}: {params: {id: number}}): Promise<NextResponse> {
    const reqBody = await request.json()

    if (!reqBody?.creditReduction){
        return new NextResponse("Invalid request body", {status: 400, headers: {"Content-Type": "text/plain"}})
    }

    const prismaResponse: PrismaResponse<User> = await decrementUserCreditsRemaining(Number(id), Number(reqBody?.creditReduction))

    if (prismaResponse.status !== 200 || !prismaResponse.data){
        const responseOptions: ResponseInit = {
            status: prismaResponse.status,
            headers: {"Content-Type": "text/plain"}
        }
        return new NextResponse(prismaResponse.message ?? "Operation failed", responseOptions)
    } 

    return NextResponse.json(prismaResponse.data, {status: 200})
}