/**
 * Implemented by the output of the prisma methods that query the database through prismaClient.
 */

export interface PrismaResponse<ResponseData> {
    status : number;
    data? : ResponseData;
    message? : string;
}

export interface GlobalParameters {
    chatGPT: ChatGPTParameters, 
    dallE: DallEParameters, 
    palm: PalmParameters
}

export interface ChatGPTParameters {

}

export interface DallEParameters {

}

export interface PalmParameters {

}
