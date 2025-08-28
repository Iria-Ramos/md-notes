import { Module } from '@nestjs/common';
import { DirsController } from './dirs.controller';
import { DirsService } from './dirs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node } from './folder/node';
import { NotesModule } from 'src/notes/notes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Node]),
    NotesModule
  ],
  controllers: [DirsController],
  providers: [DirsService]
})
export class DirsModule { }
