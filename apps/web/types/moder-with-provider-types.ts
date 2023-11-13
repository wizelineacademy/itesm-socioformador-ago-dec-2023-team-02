import type { Provider } from "@prisma/client";

/**
 * Interface that represents objects that contain information about an AI model, which includes
 * the provider it belongs to, and excludes its description. 
 */
export interface ModelWithProvider {
    id: number;
    name: string;
    active: boolean;
    modelType: string;
    provider: Provider; 
}