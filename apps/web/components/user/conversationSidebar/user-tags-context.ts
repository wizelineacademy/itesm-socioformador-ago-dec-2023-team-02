import { createContext } from "react";
import type { SidebarTag } from "@/types/sidebar-tag-types";
import type { TagsAction } from "./operations/sidebar-tag-operations";

interface TagsContextShape {
    tags: SidebarTag[];
    tagsDispatch: React.Dispatch<TagsAction>;
}

const TagsContext = createContext<TagsContextShape | null>(null)

export default TagsContext