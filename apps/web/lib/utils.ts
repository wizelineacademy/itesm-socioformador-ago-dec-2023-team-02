import ms from "ms";
import { Prisma } from "@prisma/client";

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  // if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

export type PrismaError =
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientUnknownRequestError
    | Prisma.PrismaClientRustPanicError
    | Prisma.PrismaClientInitializationError
    | Prisma.PrismaClientValidationError

export function buildErrorMessage(error: any): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError){
    return error.message
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError){
    return error.message
  } else if (error instanceof Prisma.PrismaClientRustPanicError){
    return error.message
  } else if (error instanceof Prisma.PrismaClientInitializationError){
    return error.message
  } else if (error instanceof Prisma.PrismaClientValidationError){
    return error.message
  } 

  return "Error"
}
