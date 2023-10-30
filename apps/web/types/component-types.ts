

export interface SingleSelectionListItem {
    key: string;
    name: string;
    action: ()=>void;
    style?: string;
}

export interface MultipleSelectionListItem {
    key: string;
    name: string;
    style?: string;
}