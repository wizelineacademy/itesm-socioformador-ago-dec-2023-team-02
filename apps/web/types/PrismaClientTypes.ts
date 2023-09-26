/**
 * Implemented by the output of the prisma methods that query the database through prismaClient.
 */

export interface PrismaResponse<ResponseData> {
    data? : ResponseData;
    status : number;
    message? : string;
}
