import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note/note';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { DirsModule } from 'src/dirs/dirs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note]),
  ],
  exports: [NotesService],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
