
import { NextResponse } from 'next/server';
import { addUsersToGroup } from '@/lib/group';
import type { Group, User } from '@prisma/client';
import type { PrismaResponse } from '@/types/prisma-client-types';

export async function POST(request: Request, { params: { id } }: { params: { id: string } }): Promise<NextResponse> {
    try {
        // Parse the request body
        const body = await request.json();
        
        // Validate that the body contains an array of user IDs
        if (!Array.isArray(body.userIds)) {
            return new NextResponse('Invalid input: userIds must be an array', {
                status: 400,
                headers: { 'Content-Type': 'text/plain' },
            });
        }

        const userIds: number[] = body.userIds;

        // Call the addUsersToGroup function
        const prismaResponse: PrismaResponse<{ group: Group; users: User[] }> = await addUsersToGroup(Number(id), userIds);

        if (prismaResponse.status === 200 && prismaResponse.data) {
            return NextResponse.json(prismaResponse.data, {
                status: 200,
                statusText: 'OK',
            });
        }

        return new NextResponse(prismaResponse.message || 'Unknown Error', {
            status: prismaResponse.status,
            headers: { 'Content-Type': 'text/plain' },
        });
    } catch (error: any) {
        console.error('Error processing request:', error.message);
        return new NextResponse('Server Error', {
            status: 500,
            headers: { 'Content-Type': 'text/plain' },
        });
    }
}
