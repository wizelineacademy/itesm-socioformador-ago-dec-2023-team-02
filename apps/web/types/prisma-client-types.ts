/**
 * Implemented by the output of the prisma methods that query the database through prismaClient.
 */

export interface PrismaResponse<ResponseData> {
    status: number;
    data?: ResponseData;
    message?: string;
}
