import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * Get a provider
 * @param _request A request object
 * @param params An object containing the provider ID
 * @returns A NextResponse object with the provider
 * @example
 * GET /api/providers/1
 * Returns the provider with ID 1
 * {
 *   "id": 1,
 *   "name": "Provider 1",
 *   "createdAt": "2021-08-04T20:00:00.000Z",
 *   "updatedAt": "2021-08-04T20:00:00.000Z"
 * }
 */
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const id = params.id;
  const provider = await prisma.provider.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!provider) {
    return new NextResponse("No provider with ID found", { status: 404 });
  }

  return NextResponse.json(provider);
}

/**
 * Update a provider
 * @param request A request object
 * @param params An object containing the provider ID
 * @returns A NextResponse object with the updated provider
 * @example
 * PATCH /api/providers/1
 * {
 *  "name": "Provider 1 Updated"
 * }
 * Returns the updated provider with ID 1
 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const id = params.id;
  const provider = await prisma.provider.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!provider) {
    return new NextResponse("No provider with ID found", { status: 404 });
  }

  const data = await request.json();

  const updatedProvider = await prisma.provider.update({
    where: {
      id: parseInt(id),
    },
    data,
  });

  return NextResponse.json(updatedProvider);
}
