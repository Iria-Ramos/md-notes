import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Node } from './folder/node';
import { Repository } from 'typeorm';
import { CreateNodeDto } from './folder/dto/create.dto';
import { NotesService } from 'src/notes/notes.service';
import { NodeResponseDto } from './folder/dto/response.dto';


@Injectable()
export class DirsService {
    constructor(
        @InjectRepository(Node)
        private nodeRepo: Repository<Node>,
        private noteRepo: NotesService
    ) { }

    async findAll() {
        return await this.nodeRepo.find({
            relations: ['children'],
            select: ['id', 'name', 'type', 'noteId'],
        });
    }

    async create(dto: CreateNodeDto) {
        const node = new Node();
        node.type = dto.type;
        node.name = dto.name;

        if (dto.parentId) {
            const parent = await this.nodeRepo.findOneBy({ id: dto.parentId });
            if (!parent) {
                throw new Error(`Parent folder with id ${dto.parentId} not found`);
            }
            node.parent = parent;
        }

        if (dto.type === 'note') {
            const note = await this.noteRepo.create(dto.name, "");
            node.noteId = note.id
        }

        return this.nodeRepo.save(node);
    }

    async getNodeWithChildren(id: number): Promise<Node> {
        const node = await this.nodeRepo.findOne({
            where: { id },
            relations: ['children'],
        });

        if (!node) {
            throw new Error(`Node with id ${id} not found`);
        }

        if (node?.children) {
            node.children = await Promise.all(
                node.children.map(child => this.getNodeWithChildren(child.id))
            );
        }

        return node;
    }

    async getRoot() {
        const root = await this.nodeRepo.findOne({
            where: { parent: undefined },
        });

        if (!root) throw new Error('Root folder not found');

        const folders = await this.getNodeWithChildren(root.id);

        return new NodeResponseDto(folders);
    }

    async delete(id: string) {
        return this.nodeRepo.delete(id)
    }

    async updateName(id: number, newName: string) {
        let node = await this.nodeRepo.findOneBy({ id });
        if (!node) {
            throw new Error('Not found');
        }

        node.name = newName;
        if (node.type == 'note' && node.noteId) {
            this.noteRepo.updateTitle(node.noteId, newName)
        }

        return await this.nodeRepo.save(node);
    }

    async findOne(id: number) {
        // Fetch folder with children and their notes
        const folder = await this.nodeRepo.findOne({
            where: { id, type: 'folder' },
            relations: ['children', 'children.note'],
        });

        if (!folder) throw new NotFoundException('Node not found');

        const notes = folder.children
            .filter(c => c.type === 'note')
            .map(c => ({
                id: c.note?.id,
                tile: c.name,
                content: c.note?.content,
                date: c.note?.date,
            }));

        return {
            folderId: folder.id,
            folderName: folder.name,
            notes,
        };
    }

    async addChild(dto: CreateNodeDto) {
        console.log("Adding new child:", dto)
        const folderId = dto.parentId
        const parent = await this.nodeRepo.findOne({
            where: { id: folderId, type: 'folder' },
            relations: ['children'],
        });

        if (!parent) {
            throw new NotFoundException(`Parent folder with id ${folderId} not found`);
        }

        const child = new Node();
        child.name = dto.name;
        child.type = dto.type;
        child.parent = parent;
        child.noteId = dto.noteId;

        // Save child node
        const savedChild = await this.nodeRepo.save(child);

        // Update parent's children list if needed (optional)
        console.log("Adding to the parent", parent)
        parent.children.push(savedChild);
        await this.nodeRepo.save(parent);

        return {
            id: savedChild.id,
            name: savedChild.name,
            type: savedChild.type,
            parentId: savedChild.parent?.id,
            noteId: savedChild.noteId,
        };
    }

    async updateNode(id: number, body: CreateNodeDto) {
        const node = await this.nodeRepo.findOne({ where: { id } });

        if (!node) {
            throw new NotFoundException(`Node with id ${id} not found`);
        }

        if (body.name !== undefined) {
            node.name = body.name;
        }

        if (body.type !== undefined) {
            node.type = body.type;
        }

        if (body.noteId !== undefined) {
            node.noteId = body.noteId;
        }

        if (body.parentId !== undefined) {
            const newParent = await this.nodeRepo.findOne({
                where: { id: body.parentId, type: 'folder' },
            });

            if (!newParent) {
                throw new NotFoundException(`Parent folder with id ${body.parentId} not found`);
            }

            node.parent = newParent;
        }

        const updatedNode = await this.nodeRepo.save(node);

        return {
            id: updatedNode.id,
            name: updatedNode.name,
            type: updatedNode.type,
            noteId: updatedNode.noteId,
            parentId: updatedNode.parent?.id,
        };
    }

    async getIdFromNote(noteId: number) {
        const node = await this.nodeRepo.findOne({
            where: { noteId },
        });

        if (!node) {
            throw new NotFoundException(`Node with noteId ${noteId} not found`);
        }

        return node.id;
    }
}
