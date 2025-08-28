import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note/note';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async getNote(noteId: number) {
    const note = await this.notesRepository.findOneBy({ id: noteId });

    if (!note) {
      throw new NotFoundException(`Note with ID ${noteId} not found`);
    }

    return note;
  }

  create(title: string, content: string) {
    const note = this.notesRepository.create({ title, content });
    return this.notesRepository.save(note);
  }
  
  async createMultiple(notes: Note[]) {
    // create all entities at once
    const entities = this.notesRepository.create(notes);

    // save them all in bulk
    return await this.notesRepository.save(entities);
  }

  findAll() {
    return this.notesRepository.find();
  }

  delete(id: string) {
    return this.notesRepository.delete(id)
  }

  update(id: number, title: string, content: string) {
    return this.notesRepository.update(id, { title, content })
  }

  updateTitle(id: number, title: string) {
    return this.notesRepository.update(id, { title })
  }
}
