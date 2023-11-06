import { isValidTagColor, isValidTagName } from "./tag-types";

export interface SidebarTag {
    id: number;
    name: string;
    color: string;
}