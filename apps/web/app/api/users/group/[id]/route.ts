import { NextResponse } from "next/server";
import type { User } from "@prisma/client";
import type { PrismaResponse } from "@/types/prisma-client-types";
import { getUsersNotInGroup } from "@/lib/user"; // Adjust the import path as necessary

/**
 * GET request handler, fetches all users not in a specific group.
 * @param request - The request object.
 * @param params - The request's parameters, which contain the ID of the group.
 * @returns A Promise that resolves to a NextResponse instance, potentially holding the users not in the group.
 */
export async function GET(
  request: Request, {params: {id}}: {params: {id: string}}
): Promise<NextResponse> {
  const groupID = Number(id);

  if (isNaN(groupID)) {
    return new NextResponse("Invalid group ID", {
      status: 400,
      headers: { "Content-Type": "text/plain" },
    });
  }

  const prismaResponse: PrismaResponse<User[]> =
    await getUsersNotInGroup(groupID);

  if (prismaResponse.status === 200 && prismaResponse.data) {
    return NextResponse.json(prismaResponse.data, {
      status: 200,
      statusText: "OK",
    });
  }

  return new NextResponse(prismaResponse.message || "Unknown Error", {
    status: prismaResponse.status,
    headers: { "Content-Type": "text/plain" },
  });
}
