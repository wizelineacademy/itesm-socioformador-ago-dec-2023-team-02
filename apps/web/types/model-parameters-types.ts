// todo: define the final shape of the different paramater objects of the models. 
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