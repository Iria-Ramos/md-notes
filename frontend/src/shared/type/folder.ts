
export type Node = {
    id: number;
    type: string;
    name: string;
    parentId?: number;
    children?: Array<Node>;
    noteId?: number;
}

export type CreateNode = {
    type: string;
    name: string;
    parentId?: number;
    noteId?: number;
}