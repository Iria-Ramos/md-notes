import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { DirsService } from './dirs.service';
import { CreateNodeDto } from './folder/dto/create.dto';

@Controller('dirs')
export class DirsController {

    constructor(private readonly dirsService: DirsService) { }

    @Post()
    create(@Body() body: CreateNodeDto) {
        console.log("Create a folder")
        return this.dirsService.create(body);
    }

    @Get()
    findAll() {
        console.log("Find all folders")
        return this.dirsService.findAll();
    }

    @Get('root')
    async getRootFolder() {
        console.log("Getting root")
        return this.dirsService.getRoot()
    }

    @Delete(':id')
    async deleteFolder(@Param('id') id: string) {
        console.log("Delete folder")
        const deleted = await this.dirsService.delete(id);
        if (!deleted) {
            throw new NotFoundException(`Note with id ${id} not found`);
        }
        return { status: 'ok', message: `Node ${id} deleted` };
    }

    @Patch(':id')
    changeName(@Param('id') id: number, @Body('name') body: string) {
        console.log("Update name")
        return this.dirsService.updateName(id, body)
    }

    @Get('/folders/:id/files')
    async getFiles(@Param('id') id: number) {
        return await this.dirsService.findOne(id)
    }

    @Post('addChild') 
    async addChild(@Body() body: CreateNodeDto){
        console.log("Adding child", body)
        return this.dirsService.addChild(body)
    }

    @Put(":id")
    async updateNode(@Param("id") id: number, @Body() body: CreateNodeDto) {
        console.log("Update:", body)
        return this.dirsService.updateNode(id, body)
    }

    @Get('note/:id')
    async getIdFromNote(@Param('id') noteId: number) {
        console.log("Noteid:", noteId)
        return this.dirsService.getIdFromNote(noteId)
    }
}
