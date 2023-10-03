import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _req: Request,
  _res: NextResponse
): Promise<NextResponse> {
  const providers = await prisma.provider.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return NextResponse.json(providers);
}
