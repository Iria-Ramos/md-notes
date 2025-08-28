import { Node } from "../node";

export class NodeResponseDto {
  id: number;
  type: 'folder' | 'note';
  name: string;
  noteId?: number;
  children: NodeResponseDto[];

  constructor(node: Node) {
    this.id = node.id;
    this.type = node.type;
    this.name = node.name;
    this.noteId = node.noteId;

    if (node.type === 'folder') {
      this.children = (node.children || []).map(child => new NodeResponseDto(child));
    }
  }
}