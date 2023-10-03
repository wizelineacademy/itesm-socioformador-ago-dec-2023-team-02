import type { User } from "@prisma/client"
import type { GlobalParameters, ModelParameters } from "@/types/model-parameters-types"

// More validation of the parameter values could be added. 
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

export function isValidUser(user: User): boolean {
    return isValidUserEmail(user.email) // Más validación podría ser añadida. 
}

export function isValidUserEmail(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@wizeline\.com$/.test(email) // Verificar 
}

export function isValidTagName(name: string): boolean {
    return name.length > 0 // Más validación podría ser añadida. 
}

export function isValidTagColor(color: string): boolean {
    return /^#[0-9a-fA-F]{6}$/.test(color) // El color es representado con un hexadecimal de 6 digitos. 
}

export function areValidGlobalParameters(globalParameters: GlobalParameters): boolean {
    for (const parms of Object.values(globalParameters)){
        if (!areValidModelParameters(parms as ModelParameters)){
            return false
        }
    }
    return true 
}