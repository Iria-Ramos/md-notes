import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Response,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './note/dto/create.dto';
import MarkdownIt from 'markdown-it';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Note } from './note/note';
import {
  isValidMarkdown,
} from './validators/is-markdown.validator';
import DOMPurify from 'isomorphic-dompurify';

@Controller('notes')
export class NotesController {

  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() body: CreateNoteDto) {
    return this.notesService.create(body.title, body.content);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  upload(@UploadedFiles() files: Express.Multer.File[]) {
    console.log('Uploading new file(s)...');
    const results = files.map((file) => {
      const title = file.originalname.replace(/\.md$/, '');

      const content = file.buffer.toString('utf-8');

      if (!isValidMarkdown(content)) {
        console.warn(`⚠️ File ${title} does not contain valid markdown`);
        throw new Error('Not a valid .md');
      } else {
        console.log(`✅ File ${title} is valid markdown`);
        const sanitizeContent = DOMPurify.sanitize(content);
        return { title, content: sanitizeContent } as Note;
      }
    });

    return this.notesService.createMultiple(results)
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) noteId: number) {
    return this.notesService.getNote(noteId);
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string) {
    const deleted = await this.notesService.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return { status: 'ok', message: `Note ${id} deleted` };
  }

  @Get(':id/html')
  async fromNoteToHtml(@Param('id', ParseIntPipe) noteId: number) {
    const note = await this.notesService.getNote(noteId);
    const md = new MarkdownIt({html: false});
    const html = md.render(note.content);
    return DOMPurify.sanitize(html);
  }

  @Post('html')
  renderHtml(@Body('content') body: string) {
    if (!isValidMarkdown(body)) {
        console.warn(`⚠️ Does not contain valid markdown`);
        throw new Error('Not a valid .md');
      } else {
        console.log(`✅ Is valid markdown`);
        const md = new MarkdownIt({html: false});
        const html = md.render(body);
        return DOMPurify.sanitize(html);
      }
  }

  @Put(':id')
  updateNote(@Param('id', ParseIntPipe) noteId: number, @Body() body: CreateNoteDto) {
    return this.notesService.update(noteId, body.title, body.content)
  }
}
