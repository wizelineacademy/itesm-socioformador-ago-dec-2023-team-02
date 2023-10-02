import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const id = params.id;
  const conversation = await prisma.conversation.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!conversation) {
    return new NextResponse("No conversation with ID found", { status: 404 });
  }

  return NextResponse.json(conversation);
}
