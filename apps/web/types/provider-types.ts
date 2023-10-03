/**
 * User-defined TypeScript interfaces and validation functions related to the model Provider. 
 * @packageDocumentation
 */

// -- Types -- 
/**
 * Represents the creation information for a provider.
 */
export interface ProviderCreateData {
    name: string;
    image: string;
};

/**
 * Represents the updated information for a provider.
 */
export interface ProviderUpdateData {
    name?: string;
    image?: string;
};