/**
 * User-defined TypeScript interfaces and validation functions related specifically to prisma client queries. 
 * @packageDocumentation
 */

/**
 * An interface that is implemented by all objects returned by a prisma client queries. 
 */
export interface PrismaResponse<ResponseData> {
    status: number;
    data?: ResponseData;
    message?: string;
}
