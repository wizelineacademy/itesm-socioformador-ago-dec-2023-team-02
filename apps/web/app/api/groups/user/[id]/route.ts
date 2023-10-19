import { NextResponse } from "next/server";
import { getGroupsByUserId } from "@/lib/group";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const id = parseInt(params.id);

  const groups = await getGroupsByUserId(id);
  return NextResponse.json(
    {
      message: groups.message,
      data: groups.data,
    },
    {
      status: groups.status,
    }
  );
}
