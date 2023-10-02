import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: { idUser: string } }
): Promise<NextResponse> {
  const id = params.idUser;
  const conversation = await prisma.conversation.findMany({
    where: {
      idUser: parseInt(id),
    },
  });

  if (!conversation) {
    return new NextResponse("No conversations for this User found", {
      status: 404,
    });
  }

  return NextResponse.json(conversation);
}
