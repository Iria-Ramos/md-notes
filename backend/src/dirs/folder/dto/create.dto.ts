import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class CreateNodeDto {
    @IsNotEmpty()
    type: 'folder' | 'note';

    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsOptional()
    parentId?: number;

    @IsOptional()
    children?: Node[];

    @IsOptional()
    noteId?: number;
}