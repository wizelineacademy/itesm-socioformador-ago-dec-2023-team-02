/**
 * User-defined TypeScript interfaces and validation functions related to model parameters customizable by the user. 
 * @packageDocumentation
 */

// -- Types -- 
export interface GlobalParameters {
    chatgpt: ChatgptParameters; 
    dalle: DalleParameters; 
    palm: PalmParameters; 
}

export interface ChatgptParameters {
    temperature: number; 
    context: string; 
    MODEL: 'chatgpt'; 
}

export interface DalleParameters {
    size: string; 
    MODEL: 'dalle'; 
}

export interface PalmParameters {
    temperature: number; 
    context: string; 
    MODEL: 'palm'; 
}

export type ModelParameters = ChatgptParameters | DalleParameters | PalmParameters; 

// -- Validation -- 
export function areValidModelParameters(parameters: ModelParameters): boolean {
    switch (parameters.MODEL){
      case 'chatgpt':
        return parameters.temperature >= 0 && parameters.temperature <= 1 
      case 'dalle':
        return true // Add validation for the dalle model. 
      case 'palm':
        return parameters.temperature >= 0 && parameters.temperature <= 1
    }
}

export function areValidGlobalParameters(globalParameters: GlobalParameters): boolean {
    for (const parms of Object.values(globalParameters)){
        if (!areValidModelParameters(parms as ModelParameters)){
            return false
        }
    }
    return true 
}
